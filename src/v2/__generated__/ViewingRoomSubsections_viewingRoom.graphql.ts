/* tslint:disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ViewingRoomSubsections_viewingRoom = {
    readonly subsections: ReadonlyArray<{
        readonly internalID: string;
        readonly title: string | null;
        readonly body: string | null;
        readonly image: {
            readonly imageURLs: {
                readonly normalized: string | null;
            } | null;
        } | null;
        readonly caption: string | null;
    }>;
    readonly " $refType": "ViewingRoomSubsections_viewingRoom";
};
export type ViewingRoomSubsections_viewingRoom$data = ViewingRoomSubsections_viewingRoom;
export type ViewingRoomSubsections_viewingRoom$key = {
    readonly " $data"?: ViewingRoomSubsections_viewingRoom$data;
    readonly " $fragmentRefs": FragmentRefs<"ViewingRoomSubsections_viewingRoom">;
};



const node: ReaderFragment = {
  "kind": "Fragment",
  "name": "ViewingRoomSubsections_viewingRoom",
  "type": "ViewingRoom",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "subsections",
      "storageKey": null,
      "args": null,
      "concreteType": "ViewingRoomSubsection",
      "plural": true,
      "selections": [
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "internalID",
          "args": null,
          "storageKey": null
        },
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "title",
          "args": null,
          "storageKey": null
        },
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "body",
          "args": null,
          "storageKey": null
        },
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
          "name": "caption",
          "args": null,
          "storageKey": null
        }
      ]
    }
  ]
};
(node as any).hash = '3f1d6a976cc3a98198563a8e78f35c4a';
export default node;
