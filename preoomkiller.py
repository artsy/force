#!/usr/bin/env python

"""
Sourced from https://github.com/albertz/helpers/blob/master/cgroup-mem-limit-watcher.py with some modifications
"""

import sys, time, os
import resource, signal

MemUsageFactorLimit = 0.95
PollInterval = 10
NotifySignal = signal.SIGTERM

def byteNumRepr(c):
  if c < 1024: return "%i B" % c
  S = "KMG"
  i = 0
  while i < len(S) - 1:
    if c < 0.8 * 1024 ** (i + 2): break
    i += 1
  f = float(c) / (1024 ** (i + 1))
  return "%.1f %sB" % (f, S[i])

def getRssLimit():
  return int(open("/sys/fs/cgroup/memory/memory.limit_in_bytes").read())

def getProcs():
  procs = open("/sys/fs/cgroup/memory/cgroup.procs").read().splitlines()
  return list(map(int, procs))

def getProcOomScore(procId):
  return int(open("/proc/%i/oom_score" % procId).read())

def getProcRss(procId):
  # http://man7.org/linux/man-pages/man5/proc.5.html
  stats = open("/proc/%i/stat" % procId).read().split()
  mstats = open("/proc/%i/statm" % procId).read().split()
  rss1 = int(stats[23])
  rss2 = int(mstats[1])
  return rss2 * resource.getpagesize()

def getTotalRss():
  stats = open("/sys/fs/cgroup/memory/memory.stat").read().splitlines()
  stats = dict([(key,int(value)) for key,value in map(str.split, stats)])
  return stats["rss"]


# Force disable stdout buffering.
sys.stdout = os.fdopen(sys.stdout.fileno(), 'w', 1)

def main():
  print("Starting preoomkiller...")

  while True:

    limit = getRssLimit()
    used = getTotalRss()
    fact = float(used) / limit

    if fact >= MemUsageFactorLimit:
      print("mem limit: %s, current rss: %s, percentage: %s%%" % (byteNumRepr(limit), byteNumRepr(used), round(100.0*fact)))

      print("top procs:")
      procs = sorted([(getProcRss(p),p) for p in getProcs()], reverse=True)
      for rss,p in procs[:3]:
        print("%i: %s" % (p, byteNumRepr(rss)))

      # Kill the process using the most memory
      p = procs[0][1]
      print("sending signal to proc %i ..." % p)
      os.kill(p, NotifySignal)

    time.sleep(PollInterval)
    if os.getppid() <= 1:
      # This means that our parent process has died. Stop now.
      break

if __name__ == "__main__":
  main()
