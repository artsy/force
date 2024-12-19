/**
 * @generated SignedSource<<eddb602226cbed9f72a708cb786753a1>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime"
import { FragmentRefs } from "relay-runtime"
export type FollowProfileButtonQuery$variables = {
  id: string
  isLoggedIn: boolean
}
export type FollowProfileButtonQuery$data = {
  readonly me:
    | {
        readonly " $fragmentSpreads": FragmentRefs<"FollowProfileButton_me">
      }
    | null
    | undefined
  readonly profile:
    | {
        readonly " $fragmentSpreads": FragmentRefs<"FollowProfileButton_profile">
      }
    | null
    | undefined
}
export type FollowProfileButtonQuery = {
  response: FollowProfileButtonQuery$data
  variables: FollowProfileButtonQuery$variables
}

const node: ConcreteRequest = (function () {
  var v0 = [
      {
        defaultValue: null,
        kind: "LocalArgument",
        name: "id",
      },
      {
        defaultValue: null,
        kind: "LocalArgument",
        name: "isLoggedIn",
      },
    ],
    v1 = [
      {
        kind: "Variable",
        name: "id",
        variableName: "id",
      },
    ],
    v2 = {
      alias: null,
      args: null,
      kind: "ScalarField",
      name: "id",
      storageKey: null,
    }
  return {
    fragment: {
      argumentDefinitions: v0 /*: any*/,
      kind: "Fragment",
      metadata: null,
      name: "FollowProfileButtonQuery",
      selections: [
        {
          alias: null,
          args: null,
          concreteType: "Me",
          kind: "LinkedField",
          name: "me",
          plural: false,
          selections: [
            {
              args: null,
              kind: "FragmentSpread",
              name: "FollowProfileButton_me",
            },
          ],
          storageKey: null,
        },
        {
          alias: null,
          args: v1 /*: any*/,
          concreteType: "Profile",
          kind: "LinkedField",
          name: "profile",
          plural: false,
          selections: [
            {
              args: [
                {
                  kind: "Variable",
                  name: "isLoggedIn",
                  variableName: "isLoggedIn",
                },
              ],
              kind: "FragmentSpread",
              name: "FollowProfileButton_profile",
            },
          ],
          storageKey: null,
        },
      ],
      type: "Query",
      abstractKey: null,
    },
    kind: "Request",
    operation: {
      argumentDefinitions: v0 /*: any*/,
      kind: "Operation",
      name: "FollowProfileButtonQuery",
      selections: [
        {
          alias: null,
          args: null,
          concreteType: "Me",
          kind: "LinkedField",
          name: "me",
          plural: false,
          selections: [
            v2 /*: any*/,
            {
              alias: null,
              args: null,
              concreteType: "MeCounts",
              kind: "LinkedField",
              name: "counts",
              plural: false,
              selections: [
                {
                  alias: null,
                  args: null,
                  kind: "ScalarField",
                  name: "followedProfiles",
                  storageKey: null,
                },
              ],
              storageKey: null,
            },
          ],
          storageKey: null,
        },
        {
          alias: null,
          args: v1 /*: any*/,
          concreteType: "Profile",
          kind: "LinkedField",
          name: "profile",
          plural: false,
          selections: [
            v2 /*: any*/,
            {
              alias: null,
              args: null,
              kind: "ScalarField",
              name: "slug",
              storageKey: null,
            },
            {
              alias: null,
              args: null,
              kind: "ScalarField",
              name: "name",
              storageKey: null,
            },
            {
              alias: null,
              args: null,
              kind: "ScalarField",
              name: "internalID",
              storageKey: null,
            },
            {
              condition: "isLoggedIn",
              kind: "Condition",
              passingValue: true,
              selections: [
                {
                  alias: null,
                  args: null,
                  kind: "ScalarField",
                  name: "isFollowed",
                  storageKey: null,
                },
              ],
            },
            {
              alias: null,
              args: null,
              concreteType: "ProfileCounts",
              kind: "LinkedField",
              name: "counts",
              plural: false,
              selections: [
                {
                  alias: null,
                  args: null,
                  kind: "ScalarField",
                  name: "follows",
                  storageKey: null,
                },
              ],
              storageKey: null,
            },
          ],
          storageKey: null,
        },
      ],
    },
    params: {
      cacheID: "460c85ff360d426472ac63b58f052286",
      id: null,
      metadata: {},
      name: "FollowProfileButtonQuery",
      operationKind: "query",
      text: "query FollowProfileButtonQuery(\n  $id: String!\n  $isLoggedIn: Boolean!\n) {\n  me {\n    ...FollowProfileButton_me\n    id\n  }\n  profile(id: $id) {\n    ...FollowProfileButton_profile_4dcqWc\n    id\n  }\n}\n\nfragment FollowProfileButton_me on Me {\n  id\n  counts {\n    followedProfiles\n  }\n}\n\nfragment FollowProfileButton_profile_4dcqWc on Profile {\n  id\n  slug\n  name\n  internalID\n  isFollowed @include(if: $isLoggedIn)\n  counts {\n    follows\n  }\n}\n",
    },
  }
})()

;(node as any).hash = "40d55613db927e86fe7d3406914756e9"

export default node
