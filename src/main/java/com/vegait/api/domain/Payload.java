package com.vegait.api.domain;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class Payload extends HttpServlet {

@RequestMapping("/")
@Override
protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
    StringBuilder builder = new StringBuilder();
    String aux = "";

    while ((aux = req.getReader().readLine()) != null) {
        builder.append(aux);
    }

    String text = builder.toString();
    System.out.println("------------------");
    System.out.println(text);
    System.out.println("------------------");
    try {
        JSONObject json = new JSONObject(text);
        String teams_url = json.getJSONObject("repository").getString("teams_url");
        System.out.println("Teams URL:: "+teams_url);
    } catch (JSONException e) {
        // TODO Auto-generated catch block
        e.printStackTrace();
    }
    }}
