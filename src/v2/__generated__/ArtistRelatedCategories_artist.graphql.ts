/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ArtistRelatedCategories_artist = {
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
    readonly " $refType": "ArtistRelatedCategories_artist";
};
export type ArtistRelatedCategories_artist$data = ArtistRelatedCategories_artist;
export type ArtistRelatedCategories_artist$key = {
    readonly " $data"?: ArtistRelatedCategories_artist$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"ArtistRelatedCategories_artist">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArtistRelatedCategories_artist",
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
(node as any).hash = 'c0241915a364d08052e42fc825e2fccc';
export default node;
