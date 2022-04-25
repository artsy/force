import { useRouter } from "found"
import { match } from "path-to-regexp"
import { useLoadScript } from "v2/Utils/Hooks/useLoadScript"

interface MNTNConversionPixelProps {
  bidId?: string
  bidTotal?: string
  forceEmbed?: boolean
  orderId?: string
  orderTotal?: string | null
  saleName?: string
  userId?: string
}

export const MNTNConversionPixel: React.FC<MNTNConversionPixelProps> = ({
  forceEmbed = false,
  ...props
}) => {
  const router = useRouter()

  const conversionRoutes = [
    "/signup",
    "/auction/:saleName/bid/:bidId",
    "/auction/:saleName/register",
    "/orders/:orderId/offer",
    "/orders/:orderId/status",
  ]

  const matcher = match(conversionRoutes, { decode: decodeURIComponent })
  const matchFound = !!matcher(router?.match?.location?.pathname)
  const renderPixel = matchFound || forceEmbed

  if (renderPixel) {
    return <ConversionPixel {...props} />
  }

  return null
}

const ConversionPixel: React.FC<MNTNConversionPixelProps> = ({
  bidId,
  bidTotal,
  orderId,
  orderTotal,
  saleName,
  userId,
}) => {
  useLoadScript({
    id: "mntn_conversion",
    removeOnUnmount: true,
    text: `(function(){var x=null,p,q,m,o="32548",l="${bidId}",i="${bidTotal}",c="${orderId}",k="${orderTotal}",g="${saleName}",j="",u="${userId}",shadditional="";try{p=top.document.referer!==""?encodeURIComponent(top.document.referrer.substring(0,512)):""}catch(n){p=document.referrer!==null?document.referrer.toString().substring(0,512):""}try{q=window&&window.top&&document.location&&window.top.location===document.location?document.location:window&&window.top&&window.top.location&&""!==window.top.location?window.top.location:document.location}catch(b){q=document.location}try{m=parent.location.href!==""?encodeURIComponent(parent.location.href.toString().substring(0,512)):""}catch(z){try{m=q!==null?encodeURIComponent(q.toString().substring(0,512)):""}catch(h){m=""}}var A,y=document.createElement("script"),w=null,v=document.getElementsByTagName("script"),t=Number(v.length)-1,r=document.getElementsByTagName("script")[t];if(typeof A==="undefined"){A=Math.floor(Math.random()*100000000000000000)}w="dx.mountain.com/spx?conv=1&shaid="+o+"&tdr="+p+"&plh="+m+"&cb="+A+"&shoid="+l+"&shoamt="+i+"&shocur="+c+"&shopid="+k+"&shoq="+g+"&shoup="+j+"&shpil="+u+shadditional;y.type="text/javascript";y.src=("https:"===document.location.protocol?"https://":"http://")+w;r.parentNode.insertBefore(y,r)}());`,
  })
  return null
}

export const MNTNTrackingPixel: React.FC = () => {
  useLoadScript({
    id: "mntn_tracking",
    removeOnUnmount: true,
    text: `(function(){"use strict";var e=null,b="4.0.0",n="32548",additional="term=value",t,r,i;try{t=top.document.referer!==""?encodeURIComponent(top.document.referrer.substring(0,2048)):""}catch(o){t=document.referrer!==null?document.referrer.toString().substring(0,2048):""}try{r=window&&window.top&&document.location&&window.top.location===document.location?document.location:window&&window.top&&window.top.location&&""!==window.top.location?window.top.location:document.location}catch(u){r=document.location}try{i=parent.location.href!==""?encodeURIComponent(parent.location.href.toString().substring(0,2048)):""}catch(a){try{i=r!==null?encodeURIComponent(r.toString().substring(0,2048)):""}catch(f){i=""}}var l,c=document.createElement("script"),h=null,p=document.getElementsByTagName("script"),d=Number(p.length)-1,v=document.getElementsByTagName("script")[d];if(typeof l==="undefined"){l=Math.floor(Math.random()*1e17)}h="dx.mountain.com/spx?"+"dxver="+b+"&shaid="+n+"&tdr="+t+"&plh="+i+"&cb="+l+additional;c.type="text/javascript";c.src=("https:"===document.location.protocol?"https://":"http://")+h;v.parentNode.insertBefore(c,v)})()`,
  })
  return null
}
