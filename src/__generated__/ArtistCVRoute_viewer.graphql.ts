/**
 * @generated SignedSource<<5f658b3a153e3846d5a0bcbfded16649>>
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
  };
  readonly groupShows: {
    readonly " $fragmentSpreads": FragmentRefs<"ArtistCVGroup_artist">;
  };
  readonly soloShows: {
    readonly name: string | null | undefined;
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
      "action": "NONE",
      "path": "soloShows"
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
      "action": "NONE",
      "path": "groupShows"
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
      "action": "NONE",
      "path": "fairBooths"
    }
  ],
  "type": "Viewer",
  "abstractKey": null
};
})();

(node as any).hash = "adc344e57b79d7e1f429b6bf4f955b67";

export default node;
