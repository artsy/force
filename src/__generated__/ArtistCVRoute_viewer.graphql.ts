/**
 * @generated SignedSource<<551a738b73d09d57d4257ba273ffd7b7>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArtistCVRoute_viewer$data = {
  readonly fairBooths: {
    readonly " $fragmentSpreads": FragmentRefs<"ArtistCVGroup_artist">;
  } | null | undefined;
  readonly groupShows: {
    readonly " $fragmentSpreads": FragmentRefs<"ArtistCVGroup_artist">;
  } | null | undefined;
  readonly soloShows: {
    readonly name: string | null | undefined;
    readonly " $fragmentSpreads": FragmentRefs<"ArtistCVGroup_artist">;
  } | null | undefined;
  readonly " $fragmentType": "ArtistCVRoute_viewer";
};
export type ArtistCVRoute_viewer$key = {
  readonly " $data"?: ArtistCVRoute_viewer$data;
  readonly " $fragmentSpreads": FragmentRefs<"ArtistCVRoute_viewer">;
};

const node: ReaderFragment = (function(){
var v0 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "artistID"
  }
],
v1 = {
  "kind": "Literal",
  "name": "atAFair",
  "value": false
};
return {
  "argumentDefinitions": [
    {
      "kind": "RootArgument",
      "name": "artistID"
    }
  ],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArtistCVRoute_viewer",
  "selections": [
    {
      "alias": "soloShows",
      "args": (v0/*: any*/),
      "concreteType": "Artist",
      "kind": "LinkedField",
      "name": "artist",
      "plural": false,
      "selections": [
        {
          "args": [
            (v1/*: any*/),
            {
              "kind": "Literal",
              "name": "soloShow",
              "value": true
            }
          ],
          "kind": "FragmentSpread",
          "name": "ArtistCVGroup_artist"
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
    },
    {
      "alias": "groupShows",
      "args": (v0/*: any*/),
      "concreteType": "Artist",
      "kind": "LinkedField",
      "name": "artist",
      "plural": false,
      "selections": [
        {
          "args": [
            (v1/*: any*/),
            {
              "kind": "Literal",
              "name": "soloShow",
              "value": false
            }
          ],
          "kind": "FragmentSpread",
          "name": "ArtistCVGroup_artist"
        }
      ],
      "storageKey": null
    },
    {
      "alias": "fairBooths",
      "args": (v0/*: any*/),
      "concreteType": "Artist",
      "kind": "LinkedField",
      "name": "artist",
      "plural": false,
      "selections": [
        {
          "args": [
            {
              "kind": "Literal",
              "name": "atAFair",
              "value": true
            }
          ],
          "kind": "FragmentSpread",
          "name": "ArtistCVGroup_artist"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Viewer",
  "abstractKey": null
};
})();

(node as any).hash = "238e15474108e4de0c916a2b6fe2dddf";

export default node;
