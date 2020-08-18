/* tslint:disable */
/* eslint-disable */

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
  "argumentDefinitions": [
    {
      "defaultValue": false,
      "kind": "LocalArgument",
      "name": "soloShowsAtAFair",
      "type": "Boolean"
    },
    {
      "defaultValue": true,
      "kind": "LocalArgument",
      "name": "soloShowsSoloShow",
      "type": "Boolean"
    },
    {
      "defaultValue": false,
      "kind": "LocalArgument",
      "name": "groupShowsAtAFair",
      "type": "Boolean"
    },
    {
      "defaultValue": true,
      "kind": "LocalArgument",
      "name": "fairBoothsAtAFair",
      "type": "Boolean"
    },
    {
      "kind": "RootArgument",
      "name": "artistID",
      "type": "String!"
    }
  ],
  "kind": "Fragment",
  "metadata": null,
  "name": "CV_viewer",
  "selections": [
    {
      "alias": "artist_soloShows",
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
          "name": "CVItem_artist"
        }
      ],
      "storageKey": null
    },
    {
      "alias": "artist_groupShows",
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
          "name": "CVItem_artist"
        }
      ],
      "storageKey": null
    },
    {
      "alias": "artist_fairBooths",
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
          "name": "CVItem_artist"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Viewer"
};
})();
(node as any).hash = '95af52644c864123ab8658ddcc4912f4';
export default node;
