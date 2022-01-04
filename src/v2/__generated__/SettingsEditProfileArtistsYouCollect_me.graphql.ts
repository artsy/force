/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type UserInterestCategory = "COLLECTED_BEFORE" | "INTERESTED_IN_COLLECTING" | "%future added value";
export type SettingsEditProfileArtistsYouCollect_me = {
    readonly collectorProfile: {
        readonly userInterests: ReadonlyArray<{
            readonly internalID: string;
            readonly category: UserInterestCategory;
            readonly interest: {
                readonly __typename: "Artist";
                readonly internalID: string;
                readonly name: string | null;
                readonly slug: string;
            } | {
                /*This will never be '%other', but we need some
                value in case none of the concrete values match.*/
                readonly __typename: "%other";
            };
        } | null>;
    } | null;
    readonly " $refType": "SettingsEditProfileArtistsYouCollect_me";
};
export type SettingsEditProfileArtistsYouCollect_me$data = SettingsEditProfileArtistsYouCollect_me;
export type SettingsEditProfileArtistsYouCollect_me$key = {
    readonly " $data"?: SettingsEditProfileArtistsYouCollect_me$data;
    readonly " $fragmentRefs": FragmentRefs<"SettingsEditProfileArtistsYouCollect_me">;
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
                  "type": "Artist"
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
  "type": "Me"
};
})();
(node as any).hash = '2f8b2d57a8bf81fcf21d9cd22401fb1f';
export default node;
