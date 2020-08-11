/* tslint:disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ViewingRoomHeader_viewingRoom = {
    readonly image: {
        readonly imageURLs: {
            readonly normalized: string | null;
        } | null;
    } | null;
    readonly title: string;
    readonly partner: {
        readonly name: string | null;
        readonly href: string | null;
    } | null;
    readonly distanceToOpen: string | null;
    readonly distanceToClose: string | null;
    readonly status: string;
    readonly " $refType": "ViewingRoomHeader_viewingRoom";
};
export type ViewingRoomHeader_viewingRoom$data = ViewingRoomHeader_viewingRoom;
export type ViewingRoomHeader_viewingRoom$key = {
    readonly " $data"?: ViewingRoomHeader_viewingRoom$data;
    readonly " $fragmentRefs": FragmentRefs<"ViewingRoomHeader_viewingRoom">;
};



const node: ReaderFragment = {
  "kind": "Fragment",
  "name": "ViewingRoomHeader_viewingRoom",
  "type": "ViewingRoom",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "image",
      "storageKey": null,
      "args": null,
      "concreteType": "ARImage",
      "plural": false,
      "selections": [
        {
          "kind": "LinkedField",
          "alias": null,
          "name": "imageURLs",
          "storageKey": null,
          "args": null,
          "concreteType": "ImageURLs",
          "plural": false,
          "selections": [
            {
              "kind": "ScalarField",
              "alias": null,
              "name": "normalized",
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
      "name": "title",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "partner",
      "storageKey": null,
      "args": null,
      "concreteType": "Partner",
      "plural": false,
      "selections": [
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
          "name": "href",
          "args": null,
          "storageKey": null
        }
      ]
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "distanceToOpen",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "distanceToClose",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "status",
      "args": null,
      "storageKey": null
    }
  ]
};
(node as any).hash = '796ee6ac5f38b0a78475ca0706e2dbad';
export default node;
