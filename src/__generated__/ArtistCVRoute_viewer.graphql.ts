/**
 * @generated SignedSource<<0a3d3472112c51c8ceafe034b23f1caa>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArtistCVRoute_viewer$data = {
  readonly artist: {
    readonly name: string | null | undefined;
    readonly slug: string;
  };
  readonly fairBooths: {
    readonly " $fragmentSpreads": FragmentRefs<"ArtistCVGroup_artist">;
  };
  readonly groupShows: {
    readonly " $fragmentSpreads": FragmentRefs<"ArtistCVGroup_artist">;
  };
  readonly soloShows: {
    readonly " $fragmentSpreads": FragmentRefs<"ArtistCVGroup_artist">;
  };
  readonly " $fragmentType": "ArtistCVRoute_viewer";
} | null | undefined;
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
      "kind": "RequiredField",
      "field": {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "Artist",
        "kind": "LinkedField",
        "name": "artist",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "name",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "slug",
            "storageKey": null
          }
        ],
        "storageKey": null
      },
      "action": "NONE"
    },
    {
      "kind": "RequiredField",
      "field": {
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
          }
        ],
        "storageKey": null
      },
      "action": "NONE"
    },
    {
      "kind": "RequiredField",
      "field": {
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
      "action": "NONE"
    },
    {
      "kind": "RequiredField",
      "field": {
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
      },
      "action": "NONE"
    }
  ],
  "type": "Viewer",
  "abstractKey": null
};
})();

(node as any).hash = "75038705d721ab894583ba50e9718e32";

export default node;
