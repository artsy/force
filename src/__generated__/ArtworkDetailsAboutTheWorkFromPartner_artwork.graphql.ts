/**
 * @generated SignedSource<<726ff866a71fa0753483f8755ddab9a3>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArtworkDetailsAboutTheWorkFromPartner_artwork$data = {
  readonly partner: {
    readonly internalID: string;
    readonly isDefaultProfilePublic: boolean | null;
    readonly partnerPageEligible: boolean | null;
    readonly profile: {
      readonly internalID: string;
    } | null;
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
          "name": "partnerPageEligible",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "isDefaultProfilePublic",
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

(node as any).hash = "45f5e2fa9caaa597f5c5aed74e610373";

export default node;
