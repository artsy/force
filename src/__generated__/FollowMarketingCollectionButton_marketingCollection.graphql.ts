/**
 * @generated SignedSource<<da94360a815006efefe43e5dba4e9cbf>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type FollowMarketingCollectionButton_marketingCollection$data = {
  readonly id: string;
  readonly internalID: string;
  readonly isFollowed?: boolean | null | undefined;
  readonly slug: string;
  readonly title: string;
  readonly " $fragmentType": "FollowMarketingCollectionButton_marketingCollection";
};
export type FollowMarketingCollectionButton_marketingCollection$key = {
  readonly " $data"?: FollowMarketingCollectionButton_marketingCollection$data;
  readonly " $fragmentSpreads": FragmentRefs<"FollowMarketingCollectionButton_marketingCollection">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [
    {
      "defaultValue": false,
      "kind": "LocalArgument",
      "name": "isLoggedIn"
    }
  ],
  "kind": "Fragment",
  "metadata": null,
  "name": "FollowMarketingCollectionButton_marketingCollection",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    },
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
      "name": "title",
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
      "condition": "isLoggedIn",
      "kind": "Condition",
      "passingValue": true,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "isFollowed",
          "storageKey": null
        }
      ]
    }
  ],
  "type": "MarketingCollection",
  "abstractKey": null
};

(node as any).hash = "47775ea579be36612b409e45b16c3bce";

export default node;
