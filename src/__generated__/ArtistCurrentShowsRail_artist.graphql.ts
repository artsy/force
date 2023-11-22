/**
 * @generated SignedSource<<fe0d32ecb4713f61560a3c093de91555>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArtistCurrentShowsRail_artist$data = {
  readonly href: string | null | undefined;
  readonly internalID: string;
  readonly name: string | null | undefined;
  readonly showsConnection: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly href: string | null | undefined;
        readonly internalID: string;
        readonly slug: string;
        readonly " $fragmentSpreads": FragmentRefs<"CellShow_show">;
      } | null | undefined;
    } | null | undefined> | null | undefined;
  } | null | undefined;
  readonly slug: string;
  readonly " $fragmentType": "ArtistCurrentShowsRail_artist";
};
export type ArtistCurrentShowsRail_artist$key = {
  readonly " $data"?: ArtistCurrentShowsRail_artist$data;
  readonly " $fragmentSpreads": FragmentRefs<"ArtistCurrentShowsRail_artist">;
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
},
v2 = {
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
    (v2/*: any*/),
    {
      "alias": null,
      "args": [
        {
          "kind": "Literal",
          "name": "first",
          "value": 12
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
                  "args": null,
                  "kind": "FragmentSpread",
                  "name": "CellShow_show"
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
      "storageKey": "showsConnection(first:12,sort:\"END_AT_ASC\",status:\"running\")"
    }
  ],
  "type": "Artist",
  "abstractKey": null
};
})();

(node as any).hash = "543693039594cd0406f6893064d81fea";

export default node;
