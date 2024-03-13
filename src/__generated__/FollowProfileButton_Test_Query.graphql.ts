/**
 * @generated SignedSource<<bfde6076ae03eb2ca02853ba9366eff4>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type FollowProfileButton_Test_Query$variables = Record<PropertyKey, never>;
export type FollowProfileButton_Test_Query$data = {
  readonly me: {
    readonly " $fragmentSpreads": FragmentRefs<"FollowProfileButton_me">;
  } | null | undefined;
  readonly partner: {
    readonly profile: {
      readonly " $fragmentSpreads": FragmentRefs<"FollowProfileButton_profile">;
    } | null | undefined;
  } | null | undefined;
};
export type FollowProfileButton_Test_Query = {
  response: FollowProfileButton_Test_Query$data;
  variables: FollowProfileButton_Test_Query$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "id",
    "value": "example"
  }
],
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v2 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "ID"
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "FollowProfileButton_Test_Query",
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
            "args": null,
            "kind": "FragmentSpread",
            "name": "FollowProfileButton_me"
          }
        ],
        "storageKey": null
      },
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "Partner",
        "kind": "LinkedField",
        "name": "partner",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "Profile",
            "kind": "LinkedField",
            "name": "profile",
            "plural": false,
            "selections": [
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "FollowProfileButton_profile"
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": "partner(id:\"example\")"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "FollowProfileButton_Test_Query",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Me",
        "kind": "LinkedField",
        "name": "me",
        "plural": false,
        "selections": [
          (v1/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "MeCounts",
            "kind": "LinkedField",
            "name": "counts",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "followedProfiles",
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      },
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "Partner",
        "kind": "LinkedField",
        "name": "partner",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "Profile",
            "kind": "LinkedField",
            "name": "profile",
            "plural": false,
            "selections": [
              (v1/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "slug",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "name",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "internalID",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "isFollowed",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "ProfileCounts",
                "kind": "LinkedField",
                "name": "counts",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "follows",
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          (v1/*: any*/)
        ],
        "storageKey": "partner(id:\"example\")"
      }
    ]
  },
  "params": {
    "cacheID": "b5f4ea518e4a4e683da4ae31e15397aa",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "me": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Me"
        },
        "me.counts": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "MeCounts"
        },
        "me.counts.followedProfiles": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "Int"
        },
        "me.id": (v2/*: any*/),
        "partner": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Partner"
        },
        "partner.id": (v2/*: any*/),
        "partner.profile": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Profile"
        },
        "partner.profile.counts": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ProfileCounts"
        },
        "partner.profile.counts.follows": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "FormattedNumber"
        },
        "partner.profile.id": (v2/*: any*/),
        "partner.profile.internalID": (v2/*: any*/),
        "partner.profile.isFollowed": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Boolean"
        },
        "partner.profile.name": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "String"
        },
        "partner.profile.slug": (v2/*: any*/)
      }
    },
    "name": "FollowProfileButton_Test_Query",
    "operationKind": "query",
    "text": "query FollowProfileButton_Test_Query {\n  me {\n    ...FollowProfileButton_me\n    id\n  }\n  partner(id: \"example\") {\n    profile {\n      ...FollowProfileButton_profile\n      id\n    }\n    id\n  }\n}\n\nfragment FollowProfileButton_me on Me {\n  id\n  counts {\n    followedProfiles\n  }\n}\n\nfragment FollowProfileButton_profile on Profile {\n  id\n  slug\n  name\n  internalID\n  isFollowed\n  counts {\n    follows\n  }\n}\n"
  }
};
})();

(node as any).hash = "76221880cb358078228feb98493890ae";

export default node;
