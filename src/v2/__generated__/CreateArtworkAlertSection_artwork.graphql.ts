/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type CreateArtworkAlertSection_artwork = {
    readonly internalID: string;
    readonly title: string | null;
    readonly slug: string;
    readonly artists: ReadonlyArray<{
        readonly internalID: string;
        readonly name: string | null;
        readonly slug: string;
    } | null> | null;
    readonly attributionClass: {
        readonly name: string | null;
    } | null;
    readonly " $refType": "CreateArtworkAlertSection_artwork";
};
export type CreateArtworkAlertSection_artwork$data = CreateArtworkAlertSection_artwork;
export type CreateArtworkAlertSection_artwork$key = {
    readonly " $data"?: CreateArtworkAlertSection_artwork$data;
    readonly " $fragmentRefs": FragmentRefs<"CreateArtworkAlertSection_artwork">;
};



const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "internalID",
  "storageKey": null
},
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "slug",
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
};
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "CreateArtworkAlertSection_artwork",
  "selections": [
    (v0/*: any*/),
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "title",
      "storageKey": null
    },
    (v1/*: any*/),
    {
      "alias": null,
      "args": null,
      "concreteType": "Artist",
      "kind": "LinkedField",
      "name": "artists",
      "plural": true,
      "selections": [
        (v0/*: any*/),
        (v2/*: any*/),
        (v1/*: any*/)
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "AttributionClass",
      "kind": "LinkedField",
      "name": "attributionClass",
      "plural": false,
      "selections": [
        (v2/*: any*/)
      ],
      "storageKey": null
    }
  ],
  "type": "Artwork",
  "abstractKey": null
};
})();
(node as any).hash = '4e86da0bfa2df158e1dc57215438a42f';
export default node;
