/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type PartnersLocationAutocomplete_viewer = {
    readonly cities: ReadonlyArray<{
        readonly text: string;
        readonly value: string;
        readonly coordinates: {
            readonly lat: number | null;
            readonly lng: number | null;
        } | null;
    }>;
    readonly " $refType": "PartnersLocationAutocomplete_viewer";
};
export type PartnersLocationAutocomplete_viewer$data = PartnersLocationAutocomplete_viewer;
export type PartnersLocationAutocomplete_viewer$key = {
    readonly " $data"?: PartnersLocationAutocomplete_viewer$data;
    readonly " $fragmentRefs": FragmentRefs<"PartnersLocationAutocomplete_viewer">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PartnersLocationAutocomplete_viewer",
  "selections": [
    {
      "alias": null,
      "args": [
        {
          "kind": "Literal",
          "name": "featured",
          "value": true
        }
      ],
      "concreteType": "City",
      "kind": "LinkedField",
      "name": "cities",
      "plural": true,
      "selections": [
        {
          "alias": "text",
          "args": null,
          "kind": "ScalarField",
          "name": "name",
          "storageKey": null
        },
        {
          "alias": "value",
          "args": null,
          "kind": "ScalarField",
          "name": "slug",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "concreteType": "LatLng",
          "kind": "LinkedField",
          "name": "coordinates",
          "plural": false,
          "selections": [
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "lat",
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "lng",
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": "cities(featured:true)"
    }
  ],
  "type": "Viewer"
};
(node as any).hash = 'c680419d6cbd245d2ab5dc352114eb79';
export default node;
