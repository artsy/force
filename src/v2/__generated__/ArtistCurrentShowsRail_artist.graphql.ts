/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ArtistCurrentShowsRail_artist = {
    readonly internalID: string;
    readonly name: string | null;
    readonly slug: string;
    readonly showsConnection: {
        readonly edges: ReadonlyArray<{
            readonly node: {
                readonly coverImage: {
                    readonly sourceUrl: string | null;
                } | null;
                readonly exhibitionPeriod: string | null;
                readonly href: string | null;
                readonly internalID: string;
                readonly name: string | null;
                readonly slug: string;
            } | null;
        } | null> | null;
    } | null;
    readonly " $refType": "ArtistCurrentShowsRail_artist";
};
export type ArtistCurrentShowsRail_artist$data = ArtistCurrentShowsRail_artist;
export type ArtistCurrentShowsRail_artist$key = {
    readonly " $data"?: ArtistCurrentShowsRail_artist$data;
    readonly " $fragmentRefs": FragmentRefs<"ArtistCurrentShowsRail_artist">;
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
  "name": "name",
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "slug",
  "storageKey": null
};
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArtistCurrentShowsRail_artist",
  "selections": [
    (v0/*: any*/),
    (v1/*: any*/),
    (v2/*: any*/),
    {
      "alias": null,
      "args": [
        {
          "kind": "Literal",
          "name": "first",
          "value": 5
        },
        {
          "kind": "Literal",
          "name": "sort",
          "value": "END_AT_ASC"
        },
        {
          "kind": "Literal",
          "name": "status",
          "value": "running"
        }
      ],
      "concreteType": "ShowConnection",
      "kind": "LinkedField",
      "name": "showsConnection",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "ShowEdge",
          "kind": "LinkedField",
          "name": "edges",
          "plural": true,
          "selections": [
            {
              "alias": null,
              "args": null,
              "concreteType": "Show",
              "kind": "LinkedField",
              "name": "node",
              "plural": false,
              "selections": [
                {
                  "alias": null,
                  "args": null,
                  "concreteType": "Image",
                  "kind": "LinkedField",
                  "name": "coverImage",
                  "plural": false,
                  "selections": [
                    {
                      "alias": "sourceUrl",
                      "args": [
                        {
                          "kind": "Literal",
                          "name": "version",
                          "value": [
                            "larger",
                            "large"
                          ]
                        }
                      ],
                      "kind": "ScalarField",
                      "name": "url",
                      "storageKey": "url(version:[\"larger\",\"large\"])"
                    }
                  ],
                  "storageKey": null
                },
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "exhibitionPeriod",
                  "storageKey": null
                },
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "href",
                  "storageKey": null
                },
                (v0/*: any*/),
                (v1/*: any*/),
                (v2/*: any*/)
              ],
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": "showsConnection(first:5,sort:\"END_AT_ASC\",status:\"running\")"
    }
  ],
  "type": "Artist"
};
})();
(node as any).hash = '27a2666f7764940f6e7b92fe985dad7b';
export default node;
