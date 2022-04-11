/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ArtworkSidebarCreateAlertButton_artwork = {
    readonly slug: string;
    readonly internalID: string;
    readonly title: string | null;
    readonly artists: ReadonlyArray<{
        readonly internalID: string;
        readonly name: string | null;
        readonly slug: string;
    } | null> | null;
    readonly attributionClass: {
        readonly internalID: string;
    } | null;
    readonly mediumType: {
        readonly filterGene: {
            readonly slug: string;
            readonly name: string | null;
        } | null;
    } | null;
    readonly " $refType": "ArtworkSidebarCreateAlertButton_artwork";
};
export type ArtworkSidebarCreateAlertButton_artwork$data = ArtworkSidebarCreateAlertButton_artwork;
export type ArtworkSidebarCreateAlertButton_artwork$key = {
    readonly " $data"?: ArtworkSidebarCreateAlertButton_artwork$data;
    readonly " $fragmentRefs": FragmentRefs<"ArtworkSidebarCreateAlertButton_artwork">;
};



const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "slug",
  "storageKey": null
},
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "internalID",
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
  "name": "ArtworkSidebarCreateAlertButton_artwork",
  "selections": [
    (v0/*: any*/),
    (v1/*: any*/),
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "title",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Artist",
      "kind": "LinkedField",
      "name": "artists",
      "plural": true,
      "selections": [
        (v1/*: any*/),
        (v2/*: any*/),
        (v0/*: any*/)
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
        (v1/*: any*/)
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "ArtworkMedium",
      "kind": "LinkedField",
      "name": "mediumType",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "Gene",
          "kind": "LinkedField",
          "name": "filterGene",
          "plural": false,
          "selections": [
            (v0/*: any*/),
            (v2/*: any*/)
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
(node as any).hash = '4df5f222f3236aacd8dbc226f42abe55';
export default node;
