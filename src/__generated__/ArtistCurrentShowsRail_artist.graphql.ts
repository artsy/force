/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ArtistCurrentShowsRail_artist = {
    readonly internalID: string;
    readonly name: string | null;
    readonly slug: string;
    readonly showsConnection: {
        readonly edges: ReadonlyArray<{
            readonly node: {
                readonly internalID: string;
                readonly slug: string;
                readonly href: string | null;
                readonly " $fragmentRefs": FragmentRefs<"CellShow_show">;
            } | null;
        } | null> | null;
    } | null;
    readonly " $refType": "ArtistCurrentShowsRail_artist";
};
export type ArtistCurrentShowsRail_artist$data = ArtistCurrentShowsRail_artist;
export type ArtistCurrentShowsRail_artist$key = {
    readonly " $data"?: ArtistCurrentShowsRail_artist$data | undefined;
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
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "name",
      "storageKey": null
    },
    (v1/*: any*/),
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
                (v0/*: any*/),
                (v1/*: any*/),
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "href",
                  "storageKey": null
                },
                {
                  "args": null,
                  "kind": "FragmentSpread",
                  "name": "CellShow_show"
                }
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
  "type": "Artist",
  "abstractKey": null
};
})();
(node as any).hash = '4c6c269dbc41fb2a6fe08b6946167b7a';
export default node;
