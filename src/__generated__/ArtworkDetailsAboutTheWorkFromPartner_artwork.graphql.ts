/**
 * @generated SignedSource<<785fa4da46e0a27b92be4a3b5e70b04b>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArtworkDetailsAboutTheWorkFromPartner_artwork$data = {
  readonly additionalInformation: string | null;
  readonly partner: {
    readonly internalID: string;
    readonly profile: {
      readonly internalID: string;
    } | null;
    readonly type: string | null;
    readonly " $fragmentSpreads": FragmentRefs<"EntityHeaderPartner_partner">;
  } | null;
  readonly " $fragmentType": "ArtworkDetailsAboutTheWorkFromPartner_artwork";
};
export type ArtworkDetailsAboutTheWorkFromPartner_artwork$key = {
  readonly " $data"?: ArtworkDetailsAboutTheWorkFromPartner_artwork$data;
  readonly " $fragmentSpreads": FragmentRefs<"ArtworkDetailsAboutTheWorkFromPartner_artwork">;
};

const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "internalID",
  "storageKey": null
};
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArtworkDetailsAboutTheWorkFromPartner_artwork",
  "selections": [
    {
      "alias": null,
      "args": [
        {
          "kind": "Literal",
          "name": "format",
          "value": "HTML"
        }
      ],
      "kind": "ScalarField",
      "name": "additionalInformation",
      "storageKey": "additionalInformation(format:\"HTML\")"
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Partner",
      "kind": "LinkedField",
      "name": "partner",
      "plural": false,
      "selections": [
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "EntityHeaderPartner_partner"
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "type",
          "storageKey": null
        },
        (v0/*: any*/),
        {
          "alias": null,
          "args": null,
          "concreteType": "Profile",
          "kind": "LinkedField",
          "name": "profile",
          "plural": false,
          "selections": [
            (v0/*: any*/)
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Artwork",
  "abstractKey": null
};
})();

(node as any).hash = "75b448a21f7fdfc143486518df0e1992";

export default node;
