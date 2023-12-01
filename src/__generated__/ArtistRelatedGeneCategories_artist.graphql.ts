/**
 * @generated SignedSource<<1ca750db6ce5199d47b3b5bd90fd3cfe>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArtistRelatedGeneCategories_artist$data = {
  readonly related: {
    readonly genes: {
      readonly edges: ReadonlyArray<{
        readonly node: {
          readonly href: string | null | undefined;
          readonly internalID: string;
          readonly name: string | null | undefined;
        } | null | undefined;
      } | null | undefined> | null | undefined;
    } | null | undefined;
  } | null | undefined;
  readonly " $fragmentType": "ArtistRelatedGeneCategories_artist";
};
export type ArtistRelatedGeneCategories_artist$key = {
  readonly " $data"?: ArtistRelatedGeneCategories_artist$data;
  readonly " $fragmentSpreads": FragmentRefs<"ArtistRelatedGeneCategories_artist">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArtistRelatedGeneCategories_artist",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "ArtistRelatedData",
      "kind": "LinkedField",
      "name": "related",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "GeneConnection",
          "kind": "LinkedField",
          "name": "genes",
          "plural": false,
          "selections": [
            {
              "alias": null,
              "args": null,
              "concreteType": "GeneEdge",
              "kind": "LinkedField",
              "name": "edges",
              "plural": true,
              "selections": [
                {
                  "alias": null,
                  "args": null,
                  "concreteType": "Gene",
                  "kind": "LinkedField",
                  "name": "node",
                  "plural": false,
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
                    },
                    {
                      "alias": null,
                      "args": null,
                      "kind": "ScalarField",
                      "name": "name",
                      "storageKey": null
                    }
                  ],
                  "storageKey": null
                }
              ],
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Artist",
  "abstractKey": null
};

(node as any).hash = "2235934d04ddf5351c90209d23d6a2f5";

export default node;
