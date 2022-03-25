import { useRouter } from "found"
import { match } from "path-to-regexp"
import React, { FC, useEffect } from "react"
import { useLoadScript } from "../../../Utils/Hooks/useLoadScript"

interface MntnConversionPixelProps {
  path?: string | null
}

const id = "mntn_conversion"
const text = `(function(){var x=null,p,q,m,
    o="32548",
    l="ORDER ID",
    i="TOTAL ORDER AMOUNT",
    c="",
    k="",
    g="",
    j="",
    u="",
    shadditional="";
    try{p=top.document.referer!==""?encodeURIComponent(top.document.referrer.substring(0,512)):""}catch(n){p=document.referrer!==null?document.referrer.toString().substring(0,512):""}try{q=window&&window.top&&document.location&&window.top.location===document.location?document.location:window&&window.top&&window.top.location&&""!==window.top.location?window.top.location:document.location}catch(b){q=document.location}try{m=parent.location.href!==""?encodeURIComponent(parent.location.href.toString().substring(0,512)):""}catch(z){try{m=q!==null?encodeURIComponent(q.toString().substring(0,512)):""}catch(h){m=""}}var A,y=document.createElement("script"),w=null,v=document.getElementsByTagName("script"),t=Number(v.length)-1,r=document.getElementsByTagName("script")[t];if(typeof A==="undefined"){A=Math.floor(Math.random()*100000000000000000)}w="dx.mountain.com/spx?conv=1&shaid="+o+"&tdr="+p+"&plh="+m+"&cb="+A+"&shoid="+l+"&shoamt="+i+"&shocur="+c+"&shopid="+k+"&shoq="+g+"&shoup="+j+"&shpil="+u+shadditional;y.type="text/javascript";y.src=("https:"===document.location.protocol?"https://":"http://")+w;r.parentNode.insertBefore(y,r)}());`
const type = "text/javascript"

const Pixel: FC = () => {
  useLoadScript({ id, text, type })
  return null
}

const MntnConversionPixel: FC<MntnConversionPixelProps> = ({ path }) => {
  const { match } = useRouter()
  const pathname = path ? path : match.location.pathname
  const matchFound = findConversionRoute(pathname)

  useEffect(() => {
    if (!matchFound) {
      const script = document.getElementById(id) as HTMLScriptElement | null
      if (script) {
        document.body.removeChild(script)
      }
    }
  }, [matchFound])

  if (matchFound) {
    return <Pixel />
  }

  return null
}

// account creation, auction registration, bid placed, inquiry made,
// gallery contacted, offer made, purchase
function findConversionRoute(path?: string | null) {
  if (!path) {
    return false
  }
  const conversionRoutes = [
    "/inquiry",
    "/signup",
    "/auction/:saleName/bid/:bidId",
    "/auction/:saleName/register",
    "/orders/:offerId/offer",
    "/orders/:orderId/status",
  ]
  const matcher = match(conversionRoutes, { decode: decodeURIComponent })
  const matchFound = Boolean(matcher(path))

  return Boolean(matchFound)
}

export { MntnConversionPixel }
