/* tslint:disable */
/* eslint-disable */

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
  "argumentDefinitions": [
    {
      "defaultValue": "running",
      "kind": "LocalArgument",
      "name": "currentShowsStatus",
      "type": "String"
    },
    {
      "defaultValue": "END_AT_ASC",
      "kind": "LocalArgument",
      "name": "currentShowsSort",
      "type": "ShowSorts"
    },
    {
      "defaultValue": "upcoming",
      "kind": "LocalArgument",
      "name": "upcomingShowsStatus",
      "type": "String"
    },
    {
      "defaultValue": "START_AT_ASC",
      "kind": "LocalArgument",
      "name": "upcomingShowsSort",
      "type": "ShowSorts"
    },
    {
      "defaultValue": "closed",
      "kind": "LocalArgument",
      "name": "pastShowsStatus",
      "type": "String"
    },
    {
      "defaultValue": "END_AT_DESC",
      "kind": "LocalArgument",
      "name": "pastShowsSort",
      "type": "ShowSorts"
    },
    {
      "kind": "RootArgument",
      "name": "artistID",
      "type": "String!"
    }
  ],
  "kind": "Fragment",
  "metadata": null,
  "name": "Shows_viewer",
  "selections": [
    {
      "alias": "artist_currentShows",
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
              "name": "sort",
              "variableName": "currentShowsSort"
            },
            {
              "kind": "Variable",
              "name": "status",
              "variableName": "currentShowsStatus"
            }
          ],
          "kind": "FragmentSpread",
          "name": "ArtistShows_artist"
        }
      ],
      "storageKey": null
    },
    {
      "alias": "artist_upcomingShows",
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
              "name": "sort",
              "variableName": "upcomingShowsSort"
            },
            {
              "kind": "Variable",
              "name": "status",
              "variableName": "upcomingShowsStatus"
            }
          ],
          "kind": "FragmentSpread",
          "name": "ArtistShows_artist"
        }
      ],
      "storageKey": null
    },
    {
      "alias": "artist_pastShows",
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
              "name": "sort",
              "variableName": "pastShowsSort"
            },
            {
              "kind": "Variable",
              "name": "status",
              "variableName": "pastShowsStatus"
            }
          ],
          "kind": "FragmentSpread",
          "name": "ArtistShows_artist"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Viewer"
};
})();
(node as any).hash = '88d732cfde2cab843c92b14811d5f43d';
export default node;
