/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type MyCollectionArtworkSidebarMetadata_artwork = {
    readonly artistNames: string | null;
    readonly title: string | null;
    readonly category: string | null;
    readonly medium: string | null;
    readonly dimensions: {
        readonly in: string | null;
        readonly cm: string | null;
    } | null;
    readonly date: string | null;
    readonly provenance: string | null;
    readonly attributionClass: {
        readonly shortDescription: string | null;
    } | null;
    readonly pricePaid: {
        readonly display: string | null;
    } | null;
    readonly artworkLocation: string | null;
    readonly " $refType": "MyCollectionArtworkSidebarMetadata_artwork";
};
export type MyCollectionArtworkSidebarMetadata_artwork$data = MyCollectionArtworkSidebarMetadata_artwork;
export type MyCollectionArtworkSidebarMetadata_artwork$key = {
    readonly " $data"?: MyCollectionArtworkSidebarMetadata_artwork$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"MyCollectionArtworkSidebarMetadata_artwork">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "MyCollectionArtworkSidebarMetadata_artwork",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "artistNames",
      "storageKey": null
    },
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
      "kind": "ScalarField",
      "name": "category",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "medium",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "dimensions",
      "kind": "LinkedField",
      "name": "dimensions",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "in",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "cm",
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "date",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "provenance",
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
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "shortDescription",
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Money",
      "kind": "LinkedField",
      "name": "pricePaid",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "display",
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "artworkLocation",
      "storageKey": null
    }
  ],
  "type": "Artwork",
  "abstractKey": null
};
(node as any).hash = 'd3fa3b35e98ea5f1120b6ae697f6da54';
export default node;
