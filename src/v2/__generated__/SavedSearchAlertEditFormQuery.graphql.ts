/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type SavedSearchAlertEditFormQueryVariables = {
    id: string;
    artistId: string;
};
export type SavedSearchAlertEditFormQueryResponse = {
    readonly me: {
        readonly " $fragmentRefs": FragmentRefs<"SavedSearchAlertEditForm_me">;
    } | null;
    readonly artist: {
        readonly " $fragmentRefs": FragmentRefs<"SavedSearchAlertEditForm_artist">;
    } | null;
};
export type SavedSearchAlertEditFormQuery = {
    readonly response: SavedSearchAlertEditFormQueryResponse;
    readonly variables: SavedSearchAlertEditFormQueryVariables;
};



/*
query SavedSearchAlertEditFormQuery(
  $id: ID!
  $artistId: String!
) {
  me {
    ...SavedSearchAlertEditForm_me_3PSMXk
    id
  }
  artist(id: $artistId) {
    ...SavedSearchAlertEditForm_artist
    id
  }
}

fragment SavedSearchAlertEditForm_artist on Artist {
  internalID
  name
  slug
}

fragment SavedSearchAlertEditForm_me_3PSMXk on Me {
  savedSearch(id: $id) {
    internalID
    acquireable
    additionalGeneIDs
    artistIDs
    atAuction
    attributionClass
    colors
    dimensionRange
    sizes
    height
    inquireableOnly
    locationCities
    majorPeriods
    materialsTerms
    offerable
    partnerIDs
    priceRange
    userAlertSettings {
      name
      email
      push
    }
    width
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "artistId"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "id"
},
v2 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "artistId"
  }
],
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "internalID",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "SavedSearchAlertEditFormQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Me",
        "kind": "LinkedField",
        "name": "me",
        "plural": false,
        "selections": [
          {
            "args": [
              {
                "kind": "Variable",
                "name": "savedSearchId",
                "variableName": "id"
              }
            ],
            "kind": "FragmentSpread",
            "name": "SavedSearchAlertEditForm_me"
          }
        ],
        "storageKey": null
      },
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "Artist",
        "kind": "LinkedField",
        "name": "artist",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "SavedSearchAlertEditForm_artist"
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v1/*: any*/),
      (v0/*: any*/)
    ],
    "kind": "Operation",
    "name": "SavedSearchAlertEditFormQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Me",
        "kind": "LinkedField",
        "name": "me",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": [
              {
                "kind": "Variable",
                "name": "id",
                "variableName": "id"
              }
            ],
            "concreteType": "SearchCriteria",
            "kind": "LinkedField",
            "name": "savedSearch",
            "plural": false,
            "selections": [
              (v3/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "acquireable",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "additionalGeneIDs",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "artistIDs",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "atAuction",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "attributionClass",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "colors",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "dimensionRange",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "sizes",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "height",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "inquireableOnly",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "locationCities",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "majorPeriods",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "materialsTerms",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "offerable",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "partnerIDs",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "priceRange",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "SavedSearchUserAlertSettings",
                "kind": "LinkedField",
                "name": "userAlertSettings",
                "plural": false,
                "selections": [
                  (v4/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "email",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "push",
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "width",
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          (v5/*: any*/)
        ],
        "storageKey": null
      },
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "Artist",
        "kind": "LinkedField",
        "name": "artist",
        "plural": false,
        "selections": [
          (v3/*: any*/),
          (v4/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "slug",
            "storageKey": null
          },
          (v5/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "87f7d3ca884481dad8e9113cbd8d7cbc",
    "id": null,
    "metadata": {},
    "name": "SavedSearchAlertEditFormQuery",
    "operationKind": "query",
    "text": "query SavedSearchAlertEditFormQuery(\n  $id: ID!\n  $artistId: String!\n) {\n  me {\n    ...SavedSearchAlertEditForm_me_3PSMXk\n    id\n  }\n  artist(id: $artistId) {\n    ...SavedSearchAlertEditForm_artist\n    id\n  }\n}\n\nfragment SavedSearchAlertEditForm_artist on Artist {\n  internalID\n  name\n  slug\n}\n\nfragment SavedSearchAlertEditForm_me_3PSMXk on Me {\n  savedSearch(id: $id) {\n    internalID\n    acquireable\n    additionalGeneIDs\n    artistIDs\n    atAuction\n    attributionClass\n    colors\n    dimensionRange\n    sizes\n    height\n    inquireableOnly\n    locationCities\n    majorPeriods\n    materialsTerms\n    offerable\n    partnerIDs\n    priceRange\n    userAlertSettings {\n      name\n      email\n      push\n    }\n    width\n  }\n}\n"
  }
};
})();
(node as any).hash = '7da49a2118b440c08d35b583f1a717f6';
export default node;
