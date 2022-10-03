/**
 * @generated SignedSource<<487851853a7a34b295ef0fe92fe6ebf0>>
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
          readonly href: string | null;
          readonly name: string | null;
        } | null;
      } | null> | null;
    } | null;
  } | null;
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

(node as any).hash = "9bceff0b831e055c43a3aa8fc66d1754";

export default node;
