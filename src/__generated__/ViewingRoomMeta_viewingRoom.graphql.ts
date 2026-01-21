/**
 * @generated SignedSource<<f371f75965c2563d4d8021fb671e5614>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ViewingRoomMeta_viewingRoom$data = {
  readonly image: {
    readonly imageURLs: {
      readonly normalized: string | null | undefined;
    } | null | undefined;
  } | null | undefined;
  readonly pullQuote: string | null | undefined;
  readonly status: string;
  readonly title: string;
  readonly " $fragmentType": "ViewingRoomMeta_viewingRoom";
};
export type ViewingRoomMeta_viewingRoom$key = {
  readonly " $data"?: ViewingRoomMeta_viewingRoom$data;
  readonly " $fragmentSpreads": FragmentRefs<"ViewingRoomMeta_viewingRoom">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ViewingRoomMeta_viewingRoom",
  "selections": [
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
      "name": "pullQuote",
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
    }
  ],
  "type": "ViewingRoom",
  "abstractKey": null
};

(node as any).hash = "66496f921ba4562c31762d5a8ce06542";

export default node;
