/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

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
    readonly " $data"?: ArtistShowsRoute_viewer$data | undefined;
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
      "kind": "RootArgument",
      "name": "artistID"
    },
    {
      "defaultValue": "END_AT_ASC",
      "kind": "LocalArgument",
      "name": "currentShowsSort"
    },
    {
      "defaultValue": "running",
      "kind": "LocalArgument",
      "name": "currentShowsStatus"
    },
    {
      "defaultValue": "START_AT_ASC",
      "kind": "LocalArgument",
      "name": "upcomingShowsSort"
    },
    {
      "defaultValue": "upcoming",
      "kind": "LocalArgument",
      "name": "upcomingShowsStatus"
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
  "type": "Viewer",
  "abstractKey": null
};
})();
(node as any).hash = '1e6a77e86f2c4e6e2bb445bd5cdb34fe';
export default node;
