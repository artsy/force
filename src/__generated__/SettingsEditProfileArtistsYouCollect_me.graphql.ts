/**
 * @generated SignedSource<<19839a0254f797169ad15736cb3fed85>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type UserInterestCategory = "COLLECTED_BEFORE" | "INTERESTED_IN_COLLECTING" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type SettingsEditProfileArtistsYouCollect_me$data = {
  readonly collectorProfile: {
    readonly userInterests: ReadonlyArray<{
      readonly category: UserInterestCategory;
      readonly interest: {
        readonly __typename: "Artist";
        readonly internalID: string;
        readonly name: string | null | undefined;
        readonly slug: string;
      } | {
        // This will never be '%other', but we need some
        // value in case none of the concrete values match.
        readonly __typename: "%other";
      };
      readonly internalID: string;
    } | null | undefined>;
  } | null | undefined;
  readonly " $fragmentType": "SettingsEditProfileArtistsYouCollect_me";
};
export type SettingsEditProfileArtistsYouCollect_me$key = {
  readonly " $data"?: SettingsEditProfileArtistsYouCollect_me$data;
  readonly " $fragmentSpreads": FragmentRefs<"SettingsEditProfileArtistsYouCollect_me">;
};

const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "internalID",
  "storageKey": null
};
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "SettingsEditProfileArtistsYouCollect_me",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "CollectorProfileType",
      "kind": "LinkedField",
      "name": "collectorProfile",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "UserInterest",
          "kind": "LinkedField",
          "name": "userInterests",
          "plural": true,
          "selections": [
            (v0/*: any*/),
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "category",
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "concreteType": null,
              "kind": "LinkedField",
              "name": "interest",
              "plural": false,
              "selections": [
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "__typename",
                  "storageKey": null
                },
                {
                  "kind": "InlineFragment",
                  "selections": [
                    (v0/*: any*/),
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
                      "name": "slug",
                      "storageKey": null
                    }
                  ],
                  "type": "Artist",
                  "abstractKey": null
                }
              ],
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Me",
  "abstractKey": null
};
})();

(node as any).hash = "2f8b2d57a8bf81fcf21d9cd22401fb1f";

export default node;
