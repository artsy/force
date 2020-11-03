/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ArtistSearchResults_viewer = {
    readonly searchConnection: {
        readonly edges: ReadonlyArray<{
            readonly node: {
                readonly id?: string;
                readonly slug?: string;
                readonly internalID?: string;
                readonly displayLabel?: string | null;
                readonly imageUrl?: string | null;
            } | null;
        } | null> | null;
    } | null;
    readonly " $refType": "ArtistSearchResults_viewer";
};
export type ArtistSearchResults_viewer$data = ArtistSearchResults_viewer;
export type ArtistSearchResults_viewer$key = {
    readonly " $data"?: ArtistSearchResults_viewer$data;
    readonly " $fragmentRefs": FragmentRefs<"ArtistSearchResults_viewer">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [
    {
      "kind": "RootArgument",
      "name": "term",
      "type": "String!"
    }
  ],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArtistSearchResults_viewer",
  "selections": [
    {
      "alias": null,
      "args": [
        {
          "kind": "Literal",
          "name": "entities",
          "value": [
            "ARTIST"
          ]
        },
        {
          "kind": "Literal",
          "name": "first",
          "value": 10
        },
        {
          "kind": "Literal",
          "name": "mode",
          "value": "AUTOSUGGEST"
        },
        {
          "kind": "Variable",
          "name": "query",
          "variableName": "term"
        }
      ],
      "concreteType": "SearchableConnection",
      "kind": "LinkedField",
      "name": "searchConnection",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "SearchableEdge",
          "kind": "LinkedField",
          "name": "edges",
          "plural": true,
          "selections": [
            {
              "alias": null,
              "args": null,
              "concreteType": null,
              "kind": "LinkedField",
              "name": "node",
              "plural": false,
              "selections": [
                {
                  "kind": "InlineFragment",
                  "selections": [
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
                      "kind": "ScalarField",
                      "name": "slug",
                      "storageKey": null
                    },
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
                      "name": "displayLabel",
                      "storageKey": null
                    },
                    {
                      "alias": null,
                      "args": null,
                      "kind": "ScalarField",
                      "name": "imageUrl",
                      "storageKey": null
                    }
                  ],
                  "type": "SearchableItem"
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
  "type": "Viewer"
};
(node as any).hash = '5f174c02f7998df6fd09775b6226b837';
export default node;
