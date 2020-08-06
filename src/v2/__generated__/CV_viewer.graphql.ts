/* tslint:disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type CV_viewer = {
    readonly artist_soloShows: {
        readonly " $fragmentRefs": FragmentRefs<"CVItem_artist">;
    } | null;
    readonly artist_groupShows: {
        readonly " $fragmentRefs": FragmentRefs<"CVItem_artist">;
    } | null;
    readonly artist_fairBooths: {
        readonly " $fragmentRefs": FragmentRefs<"CVItem_artist">;
    } | null;
    readonly " $refType": "CV_viewer";
};
export type CV_viewer$data = CV_viewer;
export type CV_viewer$key = {
    readonly " $data"?: CV_viewer$data;
    readonly " $fragmentRefs": FragmentRefs<"CV_viewer">;
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
  "kind": "Fragment",
  "name": "CV_viewer",
  "type": "Viewer",
  "metadata": null,
  "argumentDefinitions": [
    {
      "kind": "LocalArgument",
      "name": "soloShowsAtAFair",
      "type": "Boolean",
      "defaultValue": false
    },
    {
      "kind": "LocalArgument",
      "name": "soloShowsSoloShow",
      "type": "Boolean",
      "defaultValue": true
    },
    {
      "kind": "LocalArgument",
      "name": "groupShowsAtAFair",
      "type": "Boolean",
      "defaultValue": false
    },
    {
      "kind": "LocalArgument",
      "name": "fairBoothsAtAFair",
      "type": "Boolean",
      "defaultValue": true
    },
    {
      "kind": "RootArgument",
      "name": "artistID",
      "type": "String!"
    }
  ],
  "selections": [
    {
      "kind": "LinkedField",
      "alias": "artist_soloShows",
      "name": "artist",
      "storageKey": null,
      "args": (v0/*: any*/),
      "concreteType": "Artist",
      "plural": false,
      "selections": [
        {
          "kind": "FragmentSpread",
          "name": "CVItem_artist",
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
          ]
        }
      ]
    },
    {
      "kind": "LinkedField",
      "alias": "artist_groupShows",
      "name": "artist",
      "storageKey": null,
      "args": (v0/*: any*/),
      "concreteType": "Artist",
      "plural": false,
      "selections": [
        {
          "kind": "FragmentSpread",
          "name": "CVItem_artist",
          "args": [
            {
              "kind": "Variable",
              "name": "atAFair",
              "variableName": "groupShowsAtAFair"
            }
          ]
        }
      ]
    },
    {
      "kind": "LinkedField",
      "alias": "artist_fairBooths",
      "name": "artist",
      "storageKey": null,
      "args": (v0/*: any*/),
      "concreteType": "Artist",
      "plural": false,
      "selections": [
        {
          "kind": "FragmentSpread",
          "name": "CVItem_artist",
          "args": [
            {
              "kind": "Variable",
              "name": "atAFair",
              "variableName": "fairBoothsAtAFair"
            }
          ]
        }
      ]
    }
  ]
};
})();
(node as any).hash = '95af52644c864123ab8658ddcc4912f4';
export default node;
