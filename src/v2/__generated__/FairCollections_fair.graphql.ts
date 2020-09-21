/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type FairCollections_fair = {
    readonly marketingCollections: ReadonlyArray<{
        readonly slug: string;
        readonly title: string;
        readonly category: string;
        readonly artworks: {
            readonly edges: ReadonlyArray<{
                readonly node: {
                    readonly image: {
                        readonly url: string | null;
                    } | null;
                } | null;
            } | null> | null;
        } | null;
    } | null>;
    readonly " $refType": "FairCollections_fair";
};
export type FairCollections_fair$data = FairCollections_fair;
export type FairCollections_fair$key = {
    readonly " $data"?: FairCollections_fair$data;
    readonly " $fragmentRefs": FragmentRefs<"FairCollections_fair">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "FairCollections_fair",
  "selections": [
    {
      "alias": null,
      "args": [
        {
          "kind": "Literal",
          "name": "size",
          "value": 1
        }
      ],
      "concreteType": "MarketingCollection",
      "kind": "LinkedField",
      "name": "marketingCollections",
      "plural": true,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "slug",
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
          "alias": "artworks",
          "args": [
            {
              "kind": "Literal",
              "name": "first",
              "value": 3
            }
          ],
          "concreteType": "FilterArtworksConnection",
          "kind": "LinkedField",
          "name": "artworksConnection",
          "plural": false,
          "selections": [
            {
              "alias": null,
              "args": null,
              "concreteType": "FilterArtworksEdge",
              "kind": "LinkedField",
              "name": "edges",
              "plural": true,
              "selections": [
                {
                  "alias": null,
                  "args": null,
                  "concreteType": "Artwork",
                  "kind": "LinkedField",
                  "name": "node",
                  "plural": false,
                  "selections": [
                    {
                      "alias": null,
                      "args": null,
                      "concreteType": "Image",
                      "kind": "LinkedField",
                      "name": "image",
                      "plural": false,
                      "selections": [
                        {
                          "alias": null,
                          "args": [
                            {
                              "kind": "Literal",
                              "name": "version",
                              "value": "larger"
                            }
                          ],
                          "kind": "ScalarField",
                          "name": "url",
                          "storageKey": "url(version:\"larger\")"
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
          "storageKey": "artworksConnection(first:3)"
        }
      ],
      "storageKey": "marketingCollections(size:1)"
    }
  ],
  "type": "Fair"
};
(node as any).hash = 'aa62889f5b85a2f6a4cc1c78eda2ff21';
export default node;
