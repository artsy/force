/* tslint:disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type CurrentEvent_artist = {
    readonly currentEvent: {
        readonly event: {
            readonly __typename: string;
        };
        readonly image: {
            readonly resized: {
                readonly url: string | null;
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
  "kind": "Fragment",
  "name": "CurrentEvent_artist",
  "type": "Artist",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "currentEvent",
      "storageKey": null,
      "args": null,
      "concreteType": "CurrentEvent",
      "plural": false,
      "selections": [
        {
          "kind": "LinkedField",
          "alias": null,
          "name": "event",
          "storageKey": null,
          "args": null,
          "concreteType": null,
          "plural": false,
          "selections": [
            {
              "kind": "ScalarField",
              "alias": null,
              "name": "__typename",
              "args": null,
              "storageKey": null
            }
          ]
        },
        {
          "kind": "LinkedField",
          "alias": null,
          "name": "image",
          "storageKey": null,
          "args": null,
          "concreteType": "Image",
          "plural": false,
          "selections": [
            {
              "kind": "LinkedField",
              "alias": null,
              "name": "resized",
              "storageKey": "resized(width:300)",
              "args": [
                {
                  "kind": "Literal",
                  "name": "width",
                  "value": 300
                }
              ],
              "concreteType": "ResizedImageUrl",
              "plural": false,
              "selections": [
                {
                  "kind": "ScalarField",
                  "alias": null,
                  "name": "url",
                  "args": null,
                  "storageKey": null
                }
              ]
            }
          ]
        },
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "name",
          "args": null,
          "storageKey": null
        },
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "status",
          "args": null,
          "storageKey": null
        },
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "details",
          "args": null,
          "storageKey": null
        },
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "partner",
          "args": null,
          "storageKey": null
        },
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "href",
          "args": null,
          "storageKey": null
        }
      ]
    }
  ]
};
(node as any).hash = '3e83a9a09afbd679fe1cac057ff044cc';
export default node;
