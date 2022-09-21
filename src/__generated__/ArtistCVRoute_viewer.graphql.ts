/**
 * @generated SignedSource<<929e2e7322c0890ea857faea8d2ba44a>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArtistCVRoute_viewer$data = {
  readonly soloShows: {
    readonly name: string | null;
    readonly " $fragmentSpreads": FragmentRefs<"ArtistCVGroup_artist">;
  } | null;
  readonly groupShows: {
    readonly " $fragmentSpreads": FragmentRefs<"ArtistCVGroup_artist">;
  } | null;
  readonly fairBooths: {
    readonly " $fragmentSpreads": FragmentRefs<"ArtistCVGroup_artist">;
  } | null;
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
];
return {
  "argumentDefinitions": [
    {
      "kind": "RootArgument",
      "name": "artistID"
    },
    {
      "defaultValue": true,
      "kind": "LocalArgument",
      "name": "fairBoothsAtAFair"
    },
    {
      "defaultValue": false,
      "kind": "LocalArgument",
      "name": "groupShowsAtAFair"
    },
    {
      "defaultValue": false,
      "kind": "LocalArgument",
      "name": "soloShowsAtAFair"
    },
    {
      "defaultValue": true,
      "kind": "LocalArgument",
      "name": "soloShowsSoloShow"
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
            {
              "kind": "Variable",
              "name": "atAFair",
              "variableName": "soloShowsAtAFair"
            },
            {
              "kind": "Variable",
              "name": "soloShow",
              "variableName": "soloShowsSoloShow"
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
            {
              "kind": "Variable",
              "name": "atAFair",
              "variableName": "groupShowsAtAFair"
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
              "kind": "Variable",
              "name": "atAFair",
              "variableName": "fairBoothsAtAFair"
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

(node as any).hash = "9779a6baedba0adc1ed197819481ce40";

export default node;
