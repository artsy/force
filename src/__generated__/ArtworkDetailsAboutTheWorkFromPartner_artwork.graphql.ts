/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ArtworkDetailsAboutTheWorkFromPartner_artwork = {
    readonly additionalInformation: string | null;
    readonly partner: {
        readonly internalID: string;
        readonly profile: {
            readonly internalID: string;
        } | null;
        readonly " $fragmentRefs": FragmentRefs<"EntityHeaderPartner_partner">;
    } | null;
    readonly " $refType": "ArtworkDetailsAboutTheWorkFromPartner_artwork";
};
export type ArtworkDetailsAboutTheWorkFromPartner_artwork$data = ArtworkDetailsAboutTheWorkFromPartner_artwork;
export type ArtworkDetailsAboutTheWorkFromPartner_artwork$key = {
    readonly " $data"?: ArtworkDetailsAboutTheWorkFromPartner_artwork$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"ArtworkDetailsAboutTheWorkFromPartner_artwork">;
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
        },
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "EntityHeaderPartner_partner"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Artwork",
  "abstractKey": null
};
})();
(node as any).hash = '7cc5f0c68d11938096b84f141385db48';
export default node;
