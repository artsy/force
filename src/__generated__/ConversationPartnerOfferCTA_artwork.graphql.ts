/**
 * @generated SignedSource<<f2cdd4388b47a778d11a3ee827769983>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ConversationPartnerOfferCTA_artwork$data = {
  readonly href: string | null | undefined;
  readonly internalID: string;
  readonly " $fragmentType": "ConversationPartnerOfferCTA_artwork";
};
export type ConversationPartnerOfferCTA_artwork$key = {
  readonly " $data"?: ConversationPartnerOfferCTA_artwork$data;
  readonly " $fragmentSpreads": FragmentRefs<"ConversationPartnerOfferCTA_artwork">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ConversationPartnerOfferCTA_artwork",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "internalID",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "href",
      "storageKey": null
    }
  ],
  "type": "Artwork",
  "abstractKey": null
};

(node as any).hash = "de318ab3b87c9382c433addbdb571356";

export default node;
