/**
 * @generated SignedSource<<c2ae717dc292857e3b652f1a6d8f7818>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ViewingRoomsFeaturedRail_featuredViewingRooms$data = {
  readonly edges: ReadonlyArray<{
    readonly node: {
      readonly distanceToClose: string | null | undefined;
      readonly distanceToOpen: string | null | undefined;
      readonly image: {
        readonly imageURLs: {
          readonly normalized: string | null | undefined;
        } | null | undefined;
      } | null | undefined;
      readonly partner: {
        readonly name: string | null | undefined;
      } | null | undefined;
      readonly slug: string;
      readonly status: string;
      readonly title: string;
    } | null | undefined;
  } | null | undefined> | null | undefined;
  readonly " $fragmentType": "ViewingRoomsFeaturedRail_featuredViewingRooms";
};
export type ViewingRoomsFeaturedRail_featuredViewingRooms$key = {
  readonly " $data"?: ViewingRoomsFeaturedRail_featuredViewingRooms$data;
  readonly " $fragmentSpreads": FragmentRefs<"ViewingRoomsFeaturedRail_featuredViewingRooms">;
};

const node: ReaderFragment = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "short",
    "value": true
  }
];
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ViewingRoomsFeaturedRail_featuredViewingRooms",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "ViewingRoomsEdge",
      "kind": "LinkedField",
      "name": "edges",
      "plural": true,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "ViewingRoom",
          "kind": "LinkedField",
          "name": "node",
          "plural": false,
          "selections": [
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "status",
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
              "concreteType": "GravityARImage",
              "kind": "LinkedField",
              "name": "image",
              "plural": false,
              "selections": [
                {
                  "alias": null,
                  "args": null,
                  "concreteType": "GravityImageURLs",
                  "kind": "LinkedField",
                  "name": "imageURLs",
                  "plural": false,
                  "selections": [
                    {
                      "alias": null,
                      "args": null,
                      "kind": "ScalarField",
                      "name": "normalized",
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
              "kind": "ScalarField",
              "name": "distanceToOpen",
              "storageKey": "distanceToOpen(short:true)"
            },
            {
              "alias": null,
              "args": (v0/*: any*/),
              "kind": "ScalarField",
              "name": "distanceToClose",
              "storageKey": "distanceToClose(short:true)"
            },
            {
              "alias": null,
              "args": null,
              "concreteType": "Partner",
              "kind": "LinkedField",
              "name": "partner",
              "plural": false,
              "selections": [
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "name",
                  "storageKey": null
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
  "type": "ViewingRoomsConnection",
  "abstractKey": null
};
})();

(node as any).hash = "31c1c6e0cecf8dbb067bcda13c739aee";

export default node;
