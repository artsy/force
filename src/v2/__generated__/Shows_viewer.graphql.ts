/* tslint:disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type Shows_viewer = {
    readonly artist_currentShows: {
        readonly " $fragmentRefs": FragmentRefs<"ArtistShows_artist">;
    } | null;
    readonly artist_upcomingShows: {
        readonly " $fragmentRefs": FragmentRefs<"ArtistShows_artist">;
    } | null;
    readonly artist_pastShows: {
        readonly " $fragmentRefs": FragmentRefs<"ArtistShows_artist">;
    } | null;
    readonly " $refType": "Shows_viewer";
};
export type Shows_viewer$data = Shows_viewer;
export type Shows_viewer$key = {
    readonly " $data"?: Shows_viewer$data;
    readonly " $fragmentRefs": FragmentRefs<"Shows_viewer">;
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
  "name": "Shows_viewer",
  "type": "Viewer",
  "metadata": null,
  "argumentDefinitions": [
    {
      "kind": "LocalArgument",
      "name": "currentShowsStatus",
      "type": "String",
      "defaultValue": "running"
    },
    {
      "kind": "LocalArgument",
      "name": "currentShowsSort",
      "type": "ShowSorts",
      "defaultValue": "END_AT_ASC"
    },
    {
      "kind": "LocalArgument",
      "name": "upcomingShowsStatus",
      "type": "String",
      "defaultValue": "upcoming"
    },
    {
      "kind": "LocalArgument",
      "name": "upcomingShowsSort",
      "type": "ShowSorts",
      "defaultValue": "START_AT_ASC"
    },
    {
      "kind": "LocalArgument",
      "name": "pastShowsStatus",
      "type": "String",
      "defaultValue": "closed"
    },
    {
      "kind": "LocalArgument",
      "name": "pastShowsSort",
      "type": "ShowSorts",
      "defaultValue": "END_AT_DESC"
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
      "alias": "artist_currentShows",
      "name": "artist",
      "storageKey": null,
      "args": (v0/*: any*/),
      "concreteType": "Artist",
      "plural": false,
      "selections": [
        {
          "kind": "FragmentSpread",
          "name": "ArtistShows_artist",
          "args": [
            {
              "kind": "Variable",
              "name": "sort",
              "variableName": "currentShowsSort"
            },
            {
              "kind": "Variable",
              "name": "status",
              "variableName": "currentShowsStatus"
            }
          ]
        }
      ]
    },
    {
      "kind": "LinkedField",
      "alias": "artist_upcomingShows",
      "name": "artist",
      "storageKey": null,
      "args": (v0/*: any*/),
      "concreteType": "Artist",
      "plural": false,
      "selections": [
        {
          "kind": "FragmentSpread",
          "name": "ArtistShows_artist",
          "args": [
            {
              "kind": "Variable",
              "name": "sort",
              "variableName": "upcomingShowsSort"
            },
            {
              "kind": "Variable",
              "name": "status",
              "variableName": "upcomingShowsStatus"
            }
          ]
        }
      ]
    },
    {
      "kind": "LinkedField",
      "alias": "artist_pastShows",
      "name": "artist",
      "storageKey": null,
      "args": (v0/*: any*/),
      "concreteType": "Artist",
      "plural": false,
      "selections": [
        {
          "kind": "FragmentSpread",
          "name": "ArtistShows_artist",
          "args": [
            {
              "kind": "Variable",
              "name": "sort",
              "variableName": "pastShowsSort"
            },
            {
              "kind": "Variable",
              "name": "status",
              "variableName": "pastShowsStatus"
            }
          ]
        }
      ]
    }
  ]
};
})();
(node as any).hash = '88d732cfde2cab843c92b14811d5f43d';
export default node;
