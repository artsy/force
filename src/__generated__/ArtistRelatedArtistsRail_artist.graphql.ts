/**
 * @generated SignedSource<<2fbbf1206577cb8f3b610c97d7f7d87d>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArtistRelatedArtistsRail_artist$data = {
  readonly href: string | null;
  readonly name: string | null;
  readonly related: {
    readonly artistsConnection: {
      readonly edges: ReadonlyArray<{
        readonly node: {
          readonly href: string | null;
          readonly internalID: string;
          readonly slug: string;
          readonly " $fragmentSpreads": FragmentRefs<"CellArtist_artist">;
        } | null;
      } | null> | null;
    } | null;
  } | null;
  readonly " $fragmentType": "ArtistRelatedArtistsRail_artist";
};
export type ArtistRelatedArtistsRail_artist$key = {
  readonly " $data"?: ArtistRelatedArtistsRail_artist$data;
  readonly " $fragmentSpreads": FragmentRefs<"ArtistRelatedArtistsRail_artist">;
};

const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "href",
  "storageKey": null
};
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArtistRelatedArtistsRail_artist",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "name",
      "storageKey": null
    },
    (v0/*: any*/),
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
          "args": [
            {
              "kind": "Literal",
              "name": "first",
              "value": 20
            },
            {
              "kind": "Literal",
              "name": "kind",
              "value": "MAIN"
            }
          ],
          "concreteType": "ArtistConnection",
          "kind": "LinkedField",
          "name": "artistsConnection",
          "plural": false,
          "selections": [
            {
              "alias": null,
              "args": null,
              "concreteType": "ArtistEdge",
              "kind": "LinkedField",
              "name": "edges",
              "plural": true,
              "selections": [
                {
                  "alias": null,
                  "args": null,
                  "concreteType": "Artist",
                  "kind": "LinkedField",
                  "name": "node",
                  "plural": false,
                  "selections": [
                    {
                      "args": null,
                      "kind": "FragmentSpread",
                      "name": "CellArtist_artist"
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
                      "name": "slug",
                      "storageKey": null
                    },
                    (v0/*: any*/)
                  ],
                  "storageKey": null
                }
              ],
              "storageKey": null
            }
          ],
          "storageKey": "artistsConnection(first:20,kind:\"MAIN\")"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Artist",
  "abstractKey": null
};
})();

(node as any).hash = "4a6a762d769be3f2f6465e7c12e16269";

export default node;
