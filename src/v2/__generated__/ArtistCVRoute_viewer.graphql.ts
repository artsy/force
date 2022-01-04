/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ArtistCVRoute_viewer = {
    readonly soloShows: {
        readonly name: string | null;
        readonly " $fragmentRefs": FragmentRefs<"ArtistCVGroup_artist">;
    } | null;
    readonly groupShows: {
        readonly " $fragmentRefs": FragmentRefs<"ArtistCVGroup_artist">;
    } | null;
    readonly fairBooths: {
        readonly " $fragmentRefs": FragmentRefs<"ArtistCVGroup_artist">;
    } | null;
    readonly " $refType": "ArtistCVRoute_viewer";
};
export type ArtistCVRoute_viewer$data = ArtistCVRoute_viewer;
export type ArtistCVRoute_viewer$key = {
    readonly " $data"?: ArtistCVRoute_viewer$data;
    readonly " $fragmentRefs": FragmentRefs<"ArtistCVRoute_viewer">;
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
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "name",
          "storageKey": null
        },
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
  "type": "Viewer"
};
})();
(node as any).hash = '9779a6baedba0adc1ed197819481ce40';
export default node;
