import {
  CheckCircleFillIcon,
  PendingCircleIcon,
  XCircleIcon,
} from "@artsy/palette"
import React from "react"

export const getOrderIcon = status => {
  switch (status) {
    case "submitted":
      return <PendingCircleIcon fill="black60" />
    case "processing":
      return <PendingCircleIcon fill="black60" />
    case "canceled":
      return <XCircleIcon fill="red100" />
    case "refunded":
      return <XCircleIcon fill="red100" />
    case "confirmed":
      return <CheckCircleFillIcon />
    case "fulfilled":
      return <CheckCircleFillIcon />
  }
}

export const getOrderColor = status => {
  switch (status) {
    case "submitted":
      return "black60"
    case "processing":
      return "black60"
    case "canceled":
      return "red100"
    case "refunded":
      return "red100"
    case "confirmed":
      return "black100"
    case "fulfilled":
      return "black100"
  }
}
