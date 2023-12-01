/**
 * @generated SignedSource<<11ccc136653c44be1e150a0ed16400a7>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArtworkDetailsPartnerInfo_artwork$data = {
  readonly partner: {
    readonly internalID: string;
    readonly isDefaultProfilePublic: boolean | null | undefined;
    readonly partnerPageEligible: boolean | null | undefined;
    readonly profile: {
      readonly internalID: string;
    } | null | undefined;
    readonly " $fragmentSpreads": FragmentRefs<"EntityHeaderPartner_partner">;
  } | null | undefined;
  readonly " $fragmentType": "ArtworkDetailsPartnerInfo_artwork";
};
export type ArtworkDetailsPartnerInfo_artwork$key = {
  readonly " $data"?: ArtworkDetailsPartnerInfo_artwork$data;
  readonly " $fragmentSpreads": FragmentRefs<"ArtworkDetailsPartnerInfo_artwork">;
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
  "name": "ArtworkDetailsPartnerInfo_artwork",
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

(node as any).hash = "65a754332184ef3f0599f790d65ec289";

export default node;
