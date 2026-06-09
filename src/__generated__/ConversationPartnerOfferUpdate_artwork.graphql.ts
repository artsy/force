/**
 * @generated SignedSource<<cc9ecc4078acfc5eeb42f729d7613235>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ConversationPartnerOfferUpdate_artwork$data = {
  readonly internalID: string;
  readonly " $fragmentType": "ConversationPartnerOfferUpdate_artwork";
};
export type ConversationPartnerOfferUpdate_artwork$key = {
  readonly " $data"?: ConversationPartnerOfferUpdate_artwork$data;
  readonly " $fragmentSpreads": FragmentRefs<"ConversationPartnerOfferUpdate_artwork">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ConversationPartnerOfferUpdate_artwork",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "internalID",
      "storageKey": null
    }
  ],
  "type": "Artwork",
  "abstractKey": null
};

(node as any).hash = "299ce57a8f2e3691c338a79fea75a486";

export default node;
