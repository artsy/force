/**
 * @generated SignedSource<<c4c7fdb5a01a8035de7efb5cac20b05a>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type RetrospectiveFollowsAndSaves_collection$data = {
  readonly followsAndSaves: {
    readonly artistsConnection: {
      readonly edges: ReadonlyArray<{
        readonly node: {
          readonly artist: {
            readonly genes: ReadonlyArray<{
              readonly name: string | null;
            } | null> | null;
            readonly name: string | null;
          } | null;
        } | null;
      } | null> | null;
    } | null;
    readonly artworksConnection: {
      readonly edges: ReadonlyArray<{
        readonly node: {
          readonly artist: {
            readonly name: string | null;
          } | null;
          readonly attributionClass: {
            readonly name: string | null;
          } | null;
          readonly id: string;
          readonly mediumType: {
            readonly name: string | null;
          } | null;
        } | null;
      } | null> | null;
      readonly totalCount: number | null;
    } | null;
  } | null;
  readonly " $fragmentType": "RetrospectiveFollowsAndSaves_collection";
};
export type RetrospectiveFollowsAndSaves_collection$key = {
  readonly " $data"?: RetrospectiveFollowsAndSaves_collection$data;
  readonly " $fragmentSpreads": FragmentRefs<"RetrospectiveFollowsAndSaves_collection">;
};

const node: ReaderFragment = (function(){
var v0 = {
  "kind": "Literal",
  "name": "first",
  "value": 100
},
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v2 = [
  (v1/*: any*/)
];
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "RetrospectiveFollowsAndSaves_collection",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "FollowsAndSaves",
      "kind": "LinkedField",
      "name": "followsAndSaves",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": [
            (v0/*: any*/),
            {
              "kind": "Literal",
              "name": "page",
              "value": 1
            },
            {
              "kind": "Literal",
              "name": "private",
              "value": true
            }
          ],
          "concreteType": "SavedArtworksConnection",
          "kind": "LinkedField",
          "name": "artworksConnection",
          "plural": false,
          "selections": [
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "totalCount",
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "concreteType": "SavedArtworksEdge",
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
                      "concreteType": "Artist",
                      "kind": "LinkedField",
                      "name": "artist",
                      "plural": false,
                      "selections": (v2/*: any*/),
                      "storageKey": null
                    },
                    {
                      "alias": null,
                      "args": null,
                      "kind": "ScalarField",
                      "name": "id",
                      "storageKey": null
                    },
                    {
                      "alias": null,
                      "args": null,
                      "concreteType": "AttributionClass",
                      "kind": "LinkedField",
                      "name": "attributionClass",
                      "plural": false,
                      "selections": (v2/*: any*/),
                      "storageKey": null
                    },
                    {
                      "alias": null,
                      "args": null,
                      "concreteType": "ArtworkMedium",
                      "kind": "LinkedField",
                      "name": "mediumType",
                      "plural": false,
                      "selections": (v2/*: any*/),
                      "storageKey": null
                    }
                  ],
                  "storageKey": null
                }
              ],
              "storageKey": null
            }
          ],
          "storageKey": "artworksConnection(first:100,page:1,private:true)"
        },
        {
          "alias": null,
          "args": [
            (v0/*: any*/)
          ],
          "concreteType": "FollowArtistConnection",
          "kind": "LinkedField",
          "name": "artistsConnection",
          "plural": false,
          "selections": [
            {
              "alias": null,
              "args": null,
              "concreteType": "FollowArtistEdge",
              "kind": "LinkedField",
              "name": "edges",
              "plural": true,
              "selections": [
                {
                  "alias": null,
                  "args": null,
                  "concreteType": "FollowArtist",
                  "kind": "LinkedField",
                  "name": "node",
                  "plural": false,
                  "selections": [
                    {
                      "alias": null,
                      "args": null,
                      "concreteType": "Artist",
                      "kind": "LinkedField",
                      "name": "artist",
                      "plural": false,
                      "selections": [
                        (v1/*: any*/),
                        {
                          "alias": null,
                          "args": null,
                          "concreteType": "Gene",
                          "kind": "LinkedField",
                          "name": "genes",
                          "plural": true,
                          "selections": (v2/*: any*/),
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
          "storageKey": "artistsConnection(first:100)"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Me",
  "abstractKey": null
};
})();

(node as any).hash = "df7275a7a38cd2850befc299197890f5";

export default node;
