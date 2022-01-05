/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ArtistSeriesMeta_artistSeries = {
    readonly title: string;
    readonly description: string | null;
    readonly slug: string;
    readonly artists: ReadonlyArray<{
        readonly name: string | null;
    } | null> | null;
    readonly " $refType": "ArtistSeriesMeta_artistSeries";
};
export type ArtistSeriesMeta_artistSeries$data = ArtistSeriesMeta_artistSeries;
export type ArtistSeriesMeta_artistSeries$key = {
    readonly " $data"?: ArtistSeriesMeta_artistSeries$data;
    readonly " $fragmentRefs": FragmentRefs<"ArtistSeriesMeta_artistSeries">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArtistSeriesMeta_artistSeries",
  "selections": [
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
      "name": "description",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "slug",
      "storageKey": null
    },
    {
      "alias": null,
      "args": [
        {
          "kind": "Literal",
          "name": "size",
          "value": 1
        }
      ],
      "concreteType": "Artist",
      "kind": "LinkedField",
      "name": "artists",
      "plural": true,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "name",
          "storageKey": null
        }
      ],
      "storageKey": "artists(size:1)"
    }
  ],
  "type": "ArtistSeries",
  "abstractKey": null
};
(node as any).hash = 'b0ed3a62e7c6a2e1813211b69487c2de';
export default node;
