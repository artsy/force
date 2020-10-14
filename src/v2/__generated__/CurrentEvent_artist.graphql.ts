/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type CurrentEvent_artist = {
    readonly currentEvent: {
        readonly event: {
            readonly __typename: string;
        };
        readonly image: {
            readonly resized: {
                readonly url: string;
            } | null;
        } | null;
        readonly name: string | null;
        readonly status: string | null;
        readonly details: string | null;
        readonly partner: string | null;
        readonly href: string | null;
    } | null;
    readonly " $refType": "CurrentEvent_artist";
};
export type CurrentEvent_artist$data = CurrentEvent_artist;
export type CurrentEvent_artist$key = {
    readonly " $data"?: CurrentEvent_artist$data;
    readonly " $fragmentRefs": FragmentRefs<"CurrentEvent_artist">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "CurrentEvent_artist",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "CurrentEvent",
      "kind": "LinkedField",
      "name": "currentEvent",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": null,
          "kind": "LinkedField",
          "name": "event",
          "plural": false,
          "selections": [
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "__typename",
              "storageKey": null
            }
          ],
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "concreteType": "Image",
          "kind": "LinkedField",
          "name": "image",
          "plural": false,
          "selections": [
            {
              "alias": null,
              "args": [
                {
                  "kind": "Literal",
                  "name": "width",
                  "value": 300
                }
              ],
              "concreteType": "ResizedImageUrl",
              "kind": "LinkedField",
              "name": "resized",
              "plural": false,
              "selections": [
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "url",
                  "storageKey": null
                }
              ],
              "storageKey": "resized(width:300)"
            }
          ],
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
          "name": "status",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "details",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "partner",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "href",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Artist"
};
(node as any).hash = '3e83a9a09afbd679fe1cac057ff044cc';
export default node;
