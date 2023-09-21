/**
 * @generated SignedSource<<9d23f55566d3f91b69709b7429aa3b19>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArtworkSidebarCreateArtworkAlert_artwork$data = {
  readonly artists: ReadonlyArray<{
    readonly internalID: string;
    readonly name: string | null;
    readonly slug: string;
  } | null> | null;
  readonly attributionClass: {
    readonly internalID: string;
  } | null;
  readonly internalID: string;
  readonly isEligibleToCreateAlert: boolean;
  readonly mediumType: {
    readonly filterGene: {
      readonly name: string | null;
      readonly slug: string;
    } | null;
  } | null;
  readonly slug: string;
  readonly title: string | null;
  readonly " $fragmentType": "ArtworkSidebarCreateArtworkAlert_artwork";
};
export type ArtworkSidebarCreateArtworkAlert_artwork$key = {
  readonly " $data"?: ArtworkSidebarCreateArtworkAlert_artwork$data;
  readonly " $fragmentSpreads": FragmentRefs<"ArtworkSidebarCreateArtworkAlert_artwork">;
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
  "name": "ArtworkSidebarCreateArtworkAlert_artwork",
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
      "kind": "ScalarField",
      "name": "isEligibleToCreateAlert",
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
        (v0/*: any*/)
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
            (v1/*: any*/),
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

(node as any).hash = "400d4c5fdec360260fa06243c1dc3d9f";

export default node;
