# TitanicVR: Data Visualization of Titanic Datasets
Website: https://lvrg12.github.io/TitanicVR/

## Description

This application is intended to visualize stacked graphs through distinct graph settings and visualization techniques. The application allows for an educated comparison between these multiple settings, as well as a comparison between the provided visualization methods and other common graph representation, such as 2D charts.

## Objective

The application provides multiple graph visualization settings and two visualization modes: 3D and VR. The objective is to represent the dataset in the best way possible such that the user can gather the most useful and meaningful information in a comfortable manner.

## Related Work

The application was largely based on the Stacked Parallel Coordinate Plot described by Dr. Tommy Dang. Other resources were used to model the application's graph structure. One of these was Parallel Sets by Jason Davies. The Titanic dataset is also from Davies work. Known graph designs were used, such as Hive plots and Steam graphs.

## TitanicVR

### Tools Used
- Three.Js
- WebGL
- VS Code
- Google Cardboard

### Functionality

The starting stage of the application asks the user to provide a CSV file, the start field, and the fields that should be ignore. The user's file must be a CSV file. If no file is provided the application will use the local titanic csv file. The start field will be the field that the graph will be based on. The color code of the graph will depend on the start field's options. For some datasets there are fields that contain many different options. An example could be the age of the passenger, where the field's options will be many and will vary greatly. To ignore such fields, the field names are typed in the corresponding input box separated by commas.

Once the Generate Graph button is clicked an stacked graph will be generated. At the top of the screen there are several options from the user to choose from to change the graph settings.

The plot could be either Linear or Hive. The linear plot shows the relation between two adjacent fields, whereas the hive plot shows the relations between two adjacent fields and the first and last fields.

The graph could also by Steam (Symmetric) or not. A symmetric graph is intended to visualize the graph quantities better. In this case, the height of the archs represent tallies.

The grap can be represented through archs or rectangles for the tally representation.

There is a VR button to enter VR mode. Once clicked, an ESC button will appear to exit VR mode.

### 3D Mode Controls
- Click anywhere in the scene to rotate scene.
- Click on an arch to show only records containing the fields represented by the arch.
- Click on a column to show only the records containing the field represented by the column.
- Click on a blank space in the scene to reset the graph.

### VR Mode Controls
- Rotate your head to look at scene.
- Click on an arch to show only records containing the fields represented by the arch.
- Click on a column to show only the records containing the field represented by the column.
- Click on a blank space in the scene to reset the graph.
- Hold a click to move forward

## Use Case

## Conclusion

## References
- http://www.myweb.ttu.edu/tnhondan/file/Stacking.pdf
- https://www.jasondavies.com/parallel-sets/
- http://datavizproject.com/data-type/hive-plot/
- http://www.visualisingdata.com/2010/08/making-sense-of-streamgraphs/
- https://threejs.org
- http://mrdoob.com
- http://alteredqualia.com/
- https://w3c.github.io/deviceorientation/
- http://myweb.ttu.edu/tnhondan/iDVL/index.php