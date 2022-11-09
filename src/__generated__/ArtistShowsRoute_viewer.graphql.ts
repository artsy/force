/**
 * @generated SignedSource<<bbf018b5a865ab8893191e60261a2484>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArtistShowsRoute_viewer$data = {
  readonly artist: {
    readonly currentShowsCount: {
      readonly totalCount: number | null;
    } | null;
    readonly name: string | null;
    readonly upcomingShowsCount: {
      readonly totalCount: number | null;
    } | null;
  } | null;
  readonly currentShows: {
    readonly name: string | null;
    readonly " $fragmentSpreads": FragmentRefs<"ArtistShowsGroup_artist">;
  } | null;
  readonly upcomingShows: {
    readonly " $fragmentSpreads": FragmentRefs<"ArtistShowsGroup_artist">;
  } | null;
  readonly " $fragmentType": "ArtistShowsRoute_viewer";
};
export type ArtistShowsRoute_viewer$key = {
  readonly " $data"?: ArtistShowsRoute_viewer$data;
  readonly " $fragmentSpreads": FragmentRefs<"ArtistShowsRoute_viewer">;
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
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v2 = {
  "kind": "Literal",
  "name": "first",
  "value": 1
},
v3 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "totalCount",
    "storageKey": null
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
      "alias": null,
      "args": (v0/*: any*/),
      "concreteType": "Artist",
      "kind": "LinkedField",
      "name": "artist",
      "plural": false,
      "selections": [
        (v1/*: any*/),
        {
          "alias": "currentShowsCount",
          "args": [
            (v2/*: any*/),
            {
              "kind": "Literal",
              "name": "status",
              "value": "running"
            }
          ],
          "concreteType": "ShowConnection",
          "kind": "LinkedField",
          "name": "showsConnection",
          "plural": false,
          "selections": (v3/*: any*/),
          "storageKey": "showsConnection(first:1,status:\"running\")"
        },
        {
          "alias": "upcomingShowsCount",
          "args": [
            (v2/*: any*/),
            {
              "kind": "Literal",
              "name": "status",
              "value": "upcoming"
            }
          ],
          "concreteType": "ShowConnection",
          "kind": "LinkedField",
          "name": "showsConnection",
          "plural": false,
          "selections": (v3/*: any*/),
          "storageKey": "showsConnection(first:1,status:\"upcoming\")"
        }
      ],
      "storageKey": null
    },
    {
      "alias": "currentShows",
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
          "name": "ArtistShowsGroup_artist"
        },
        (v1/*: any*/)
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

(node as any).hash = "61dfb612d3974e93bf9cfdb981d20c21";

export default node;
