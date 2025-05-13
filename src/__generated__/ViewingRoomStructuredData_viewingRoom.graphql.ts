/**
 * @generated SignedSource<<5965b94fa6deb728e3ef8920a034c5e4>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ViewingRoomStructuredData_viewingRoom$data = {
  readonly endAt: string | null | undefined;
  readonly href: string | null | undefined;
  readonly image: {
    readonly imageURLs: {
      readonly normalized: string | null | undefined;
    } | null | undefined;
  } | null | undefined;
  readonly introStatement: string | null | undefined;
  readonly partner: {
    readonly href: string | null | undefined;
    readonly name: string | null | undefined;
  } | null | undefined;
  readonly startAt: string | null | undefined;
  readonly status: string;
  readonly title: string;
  readonly " $fragmentType": "ViewingRoomStructuredData_viewingRoom";
};
export type ViewingRoomStructuredData_viewingRoom$key = {
  readonly " $data"?: ViewingRoomStructuredData_viewingRoom$data;
  readonly " $fragmentSpreads": FragmentRefs<"ViewingRoomStructuredData_viewingRoom">;
};

const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "href",
  "storageKey": null
};
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ViewingRoomStructuredData_viewingRoom",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "title",
      "storageKey": null
    },
    (v0/*: any*/),
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "introStatement",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "startAt",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "endAt",
      "storageKey": null
    },
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
        },
        (v0/*: any*/)
      ],
      "storageKey": null
    }
  ],
  "type": "ViewingRoom",
  "abstractKey": null
};
})();

(node as any).hash = "97770ac120b7d1126b3a594ebe753b2e";

export default node;
