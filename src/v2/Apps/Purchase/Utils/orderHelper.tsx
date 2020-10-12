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
    case "canceled":
    case "refunded":
      return <XCircleIcon fill="red100" />
    case "approved":
    case "fulfilled":
      return <CheckCircleFillIcon />
  }
}

export const getOrderColor = status => {
  switch (status) {
    case "submitted":
      return "black60"
    case "canceled":
    case "refunded":
      return "red100"
    case "approved":
    case "fulfilled":
      return "black100"
  }
}
