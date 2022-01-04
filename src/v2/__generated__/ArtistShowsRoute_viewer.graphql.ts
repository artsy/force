/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ArtistShowsRoute_viewer = {
    readonly currentShows: {
        readonly name: string | null;
        readonly " $fragmentRefs": FragmentRefs<"ArtistShowsGroup_artist">;
    } | null;
    readonly upcomingShows: {
        readonly " $fragmentRefs": FragmentRefs<"ArtistShowsGroup_artist">;
    } | null;
    readonly " $refType": "ArtistShowsRoute_viewer";
};
export type ArtistShowsRoute_viewer$data = ArtistShowsRoute_viewer;
export type ArtistShowsRoute_viewer$key = {
    readonly " $data"?: ArtistShowsRoute_viewer$data;
    readonly " $fragmentRefs": FragmentRefs<"ArtistShowsRoute_viewer">;
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
      "kind": "RootArgument",
      "name": "artistID",
      "type": "String!"
    }
  ],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArtistShowsRoute_viewer",
  "selections": [
    {
      "alias": "currentShows",
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
          "name": "ArtistShowsGroup_artist"
        }
      ],
      "storageKey": null
    },
    {
      "alias": "upcomingShows",
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
          "name": "ArtistShowsGroup_artist"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Viewer"
};
})();
(node as any).hash = '1e6a77e86f2c4e6e2bb445bd5cdb34fe';
export default node;
