/**
 * @generated SignedSource<<3e5205d1b852f5baa16c636b252ffff6>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type OpenInquiryModalCTA_conversation$data = {
  readonly internalID: string | null;
  readonly " $fragmentType": "OpenInquiryModalCTA_conversation";
};
export type OpenInquiryModalCTA_conversation$key = {
  readonly " $data"?: OpenInquiryModalCTA_conversation$data;
  readonly " $fragmentSpreads": FragmentRefs<"OpenInquiryModalCTA_conversation">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "OpenInquiryModalCTA_conversation",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "internalID",
      "storageKey": null
    }
  ],
  "type": "Conversation",
  "abstractKey": null
};

(node as any).hash = "6a92bd36eeebaa9bcf1358dde1d89f41";

export default node;
